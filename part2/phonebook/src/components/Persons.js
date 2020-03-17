import React from 'react'
import Person from './Person'

const Persons = ({ persons, query, handleDelete }) => {
  let toRender
  if (query === '') {
    toRender = persons
  } else {
    toRender = persons.filter(person =>
      person.name.toLowerCase().includes(query))
  }

  const rows = toRender.map(person =>
    <Person key={person.name} name={person.name} number={person.number}
      personId={person.id} handleDelete={handleDelete} />)

  return (
    <ul style={{ listStyleType: "none" }}>
      {rows}
    </ul>
  )
}

export default Persons