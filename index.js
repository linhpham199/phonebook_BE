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
app.use(bodyParser.json())
app.use(morgan(':status :reqbody'))
app.use('/api/persons', routes.persons)
app.use('/info', routes.info)

const port = process.env.PORT || 3002
app.listen(port)
console.log(`Server running on port ${port}`)