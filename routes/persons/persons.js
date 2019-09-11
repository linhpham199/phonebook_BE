const express = require('express')
const persons = express.Router()
const Person = require('../../models/person')

persons.get('/', (req, res, next) => {
  Person.find({})
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

persons.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(204).end()
      }
    })
    .catch(error => next(error))
})

persons.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

persons.post('/', (req, res, next) => {
  const { name, number } = req.body

  if ( name === undefined || name.length === 0 || number === undefined || number.length === 0) {
    res.status(422).send('Name or number is missing!')
  } else {
    const person = new Person({
      name,
      number
    })
  
    person.save()
      .then(savedPerson => {res.status(200).json(savedPerson.toJSON())})
      .catch(error => next(error))
  }
})

persons.put('/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }

  console.log('body ', req.body)

  Person.findOneAndUpdate(
      { _id: req.params.id }, 
      person, 
      { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => {
      next(error)
    })
})

const info = express.Router()

info.get('/', (req, res, next) => {
  Person.estimatedDocumentCount()
  .then(count => {
    res.write(`Phonebook has info for ${count} people \n \n`)
    const date = new Date()
    res.write(date.toString())
    res.end()
  })
  .catch(err => next(err))

  
})

module.exports = { persons, info };


