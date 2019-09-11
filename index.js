require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/persons/persons')
const app = express()
const cors = require('cors')

morgan.token('reqbody', function getRes (req, res) {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':status :reqbody'))
app.use('/api/persons', routes.persons)
app.use('/info', routes.info)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name = 'ValidationError') {
    return res.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)


const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)