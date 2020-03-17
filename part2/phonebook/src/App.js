import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import ChangeNotification from './components/ChangeNotification'
import ErrorNotification from './components/ErrorNotification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [changeMessage, setChangeMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = e => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook, replace their number with a new one?`)) {
        updatePerson({ ...existingPerson, number: newNumber })
      }
    } else {
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setChangeMessage(`Added ${person.name}`)
          setTimeout(() => setChangeMessage(null), 5000)
        })
    }
  }

  const updatePerson = person => {
    personService
      .update(person.id, person)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
        setChangeMessage(`Updated ${person.name}`)
        setTimeout(() => setChangeMessage(null), 5000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${person.name} has already been 
          removed from the server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setPersons(persons.filter(p => (p.id !== person.id)))
      })
  }

  const deletePerson = id => {
    const toBeDeleted = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${toBeDeleted.name}?`)) {
      return
    }
    personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => (person.id !== id)))
        setChangeMessage(`Deleted ${toBeDeleted.name}`)
        setTimeout(() => setChangeMessage(null), 5000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${toBeDeleted.name} has already been 
          removed from the server`)
        setTimeout(() => setErrorMessage(null), 5000)  
        setPersons(persons.filter(p => (p.id !== toBeDeleted.id)))
      })
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleQueryChange = e => {
    setQuery(e.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleQuery={handleQueryChange} />
      <ChangeNotification message={changeMessage} />
      <ErrorNotification message={errorMessage} />
      <h2>Add a new person</h2>
      <PersonForm name={newName} number={newNumber}
        handleName={handleNameChange} handleNumber={handleNumberChange}
        addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} handleDelete={deletePerson} />
    </div>
  )
}

export default App