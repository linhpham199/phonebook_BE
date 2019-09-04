const express = require('express')
const persons = express.Router()
// const personsList = require('../../db')

let personsList = [
  {
    name: "Arto Hellas", 
    number: "040-123456",
    id: 1
  },
  { 
    name: "Ada Lovelace", 
    number: "39-44-5323523",
    id: 2
  },
  { 
    name: "Dan Abramov", 
    number: "12-43-234345",
    id: 3
  },
  { 
    name: "Mary Poppendieck", 
    number: "39-23-6423122",
    id: 4
  } 
]

persons.get('/', (req, res) => {
  res.status(200).json(personsList)
})

persons.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  const foundPerson = personsList.find(person => person.id === id)

  if (foundPerson === undefined) {
    res.status(404).json({ message: 'cannot found' })
  } else {
    res.status(200).json(foundPerson)
  }
})

persons.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  const foundPerson = personsList.find(person => person.id === id)  

  if (foundPerson) {
    personsList = personsList.filter(person => person.id !== id)
    res.status(200).send(`Person with id ${id} is deleted successfully!`)
  } else {
    res.status(404).send(`Person with id ${id} is not found!`)
  }
})

persons.post('/', (req, res) => {
  const { name, number } = req.body

  const existedPerson = personsList.find(person => person.name === name)

  if ( name === undefined || name.length === 0 || number === undefined || number.length === 0) {
    res.status(422).send('Name or number is missing!')
  } else if (existedPerson !== undefined) {
    res.status(400).send('Name existed in the phonebook!')
  } else {
    const newPerson = {
      id: Math.floor(Math.random() * 100000),
      name,
      number
    }
  
    newPersonsList = personsList.concat(newPerson)
    personsList = newPersonsList

    res.status(200).send('New person is added!')
  }
})

const info = express.Router()

info.get('/', (req, res) => {
  console.log(personsList)
  const date = new Date()
  res.write(`Phonebook has info for ${personsList.length} people \n \n`)
  res.write(date.toString())
  res.end()
})

module.exports = { persons, info };


