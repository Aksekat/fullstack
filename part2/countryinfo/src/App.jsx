import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Country from './components/Country'

function App() {
  const [filter, setFilter] = useState('')
  const [show, setShow] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(response => setCountries(response))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShow(null)
  }

  const countriesToShow = filter === ''
    ? countries
    : countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))

  const listStyle = {
    listStyleType: 'none',
    padding: 2
  }

  const handleShow = (c) => {
    setShow(c)
  }

  return (
    <div>
      find countries: <input value={filter} onChange={handleFilterChange} />
      {filter === ''
        ? null
        : countriesToShow.length > 10
          ? <p>Too many matches, specify another filter</p>
          : countriesToShow.length === 1
            ? <Country country={countriesToShow[0]} />
            : show
              ? <Country country={show} />
              : <ul style={listStyle}>
                {countriesToShow.map(c =>
                  <li key={c.name.official}>{c.name.common}
                    <button onClick={() => handleShow(c)}>show</button>
                  </li>)}
              </ul>}
    </div>
  )
}

export default App
