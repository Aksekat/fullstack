import React from 'react';

const Country = ({ country }) => {

  const languages = country.languages.map(lang => (<li key={lang.iso639_2}>
    {lang.name}</li>))

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} alt='Flag of the country' width='200px'>
      </img>
    </div>
  )
}

export default Country