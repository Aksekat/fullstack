import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        setCountries(response.data))
  }, [])

  const handleQueryChange = (e) => {
    setQuery(e.target.value.toLowerCase())
    setShow(null)
  }

  const handleShow = (e) => {
    setShow(e.target.name)
  }

  return (
    <div>
      <Filter query={query} handleQuery={handleQueryChange} />
      <Countries countries={countries} query={show||query} handleShow={handleShow}/>
    </div>
  )
}

export default App;