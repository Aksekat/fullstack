import React from 'react'

const Person = ({ name, number, personId, handleDelete }) => (
  <li>{name} {number}<button onClick={() => handleDelete(personId)}>remove
  </button></li>
)

export default Person