const Country = ({ country }) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
        {(Object.entries(country.languages)).map(l => <li key={l[0]}>{l[1]}</li>)}
        </ul>
        <img src={country.flags.png} alt='Flag of the country' width='200px'/>
      </div>
    )
  }
  
  export default Country