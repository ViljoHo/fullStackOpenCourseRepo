
import { useEffect, useState } from "react"
import axios from 'axios'

//components
const Filter = ({filter, handleFilterChange}) => {

  return (
    <div>
        filter shown with :<input value={filter} onChange={handleFilterChange}/>
    </div>
  )

}





const Content = ({ countries, filter, handleCountryChange, oneCountryData, handleShowButton, showButtonClicked }) => {

  
  const filteredCountries = countries.filter((country) => {
    
    return country.toLowerCase().match(filter.toLowerCase()) !== null

  })
  
  useEffect(() => {
    if (filteredCountries.length === 1) {
      handleCountryChange(filteredCountries[0])
    } 

  }, [filteredCountries, handleCountryChange,])


  if (filter === '') {
    return null
  } else if (filteredCountries.length > 10) {

    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )

  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {

    if (showButtonClicked) {
      return (
        <TheCountry countryData={oneCountryData} />
      )
    } else {
      return (
        <div>
          <ul>
            {filteredCountries.map(country =>
              <li key={country}>{country} <button onClick={() => {
                handleCountryChange(country)
                handleShowButton(true)}}>show</button></li>)}
          </ul>
        </div>
      )
    }
  } else if (filteredCountries.length === 1) {

    return (
      <TheCountry countryData={oneCountryData} />
    )

  } else {
    return null
  }

}








const TheCountry = ({ countryData }) => {

  const [iconUrl, setIconUrl] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)

  useEffect(() => {
    if(countryData) {
      const apikey = import.meta.env.VITE_API_KEY
      const lat = countryData.latlng[0]
      const lon = countryData.latlng[1]
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
        .then(response => {
          setTemperature(response.data.main.temp)
          setIconUrl(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
          setWind(response.data.wind.speed)
        })
    }
    
  }, [countryData])

  if (countryData === null) {
    return null
  }
  const countryName = countryData.name.common
  const capital = countryData.capital[0]
  const area = countryData.area
  const languages = countryData.languages
  let languagesList = []
  for (const key in languages) {
    languagesList = languagesList.concat(languages[key])
  }
  const flagSvg = countryData.flags.svg


  return (
    <div>
      <h1>{countryName}</h1>
      <br />
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <br />
      <h3>Languages</h3>
      <ul>
        {languagesList.map(language =>
          <li key={language}>{language}</li>)}
      </ul>
      <img src={flagSvg} alt="Image of country's flag" width={250} />
      <h1>{`Weather in ${countryName}`}</h1>
      <p>{`Temperature ${temperature} Celcius`}</p>
      <img src={iconUrl} alt="Weather icon" />
      <p>{`Wind ${wind} m/s`}</p>


    </div>
  )
}








const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [countryData, setCountryData] = useState(null)
  const [filter, setFilter] = useState('')
  const [showButtonClicked, setShowButtonClicked] = useState(false)


  useEffect(() => {
    if (countries.length === 0) {
      
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data.map(countryData => countryData.name.common))
        })
    }

    if (country) {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setCountryData(response.data)
        })

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country])


  const handleFilterChange = (event) => {

    // clearing showButtonClicked state when backspacing
    const currentInput = event.target.value
    if (filter.length > currentInput.length) {
      setShowButtonClicked(false)
    }
    setFilter(event.target.value)
  }

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry)
  }

  const handleShowButton = (isClicked) => {
    setShowButtonClicked(isClicked)
  }

  

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <Content
        countries={countries}
        filter={filter}
        handleCountryChange={handleCountryChange}
        oneCountryData={countryData}
        handleShowButton={handleShowButton}
        showButtonClicked={showButtonClicked}

      />



    </div>
  )
}

export default App

//++++++++++++++++++2.20 tehty+++++++++++++++

