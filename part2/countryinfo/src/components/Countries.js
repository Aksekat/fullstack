import React from 'react';
import Country from './Country'

const Countries = ({ countries, query, handleShow }) => {

  let toRender

  if (query === '') {
    toRender = countries
  } else {
    toRender = countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase()))
  }

  if (toRender.length > 10) {
    return (
      <p>Too many matches, please specify another filter.</p>
    )
  }

  if (toRender.length === 1) {
    return (<Country country={toRender[0]} />)
  }

  const rows = toRender.map(country => (<li key={country.numericCode}>
    {country.name} <button onClick={handleShow} name={country.name}>show</button></li>))

  return (
    <ul>
      {rows}
    </ul>
  )
}

export default Countries