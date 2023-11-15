import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, type}) => {
  //type = true: good notification
  //type = false: bad notifigation

    const goodNotificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 15,
      padding: 20,
      marginBottom: 10
    }

  
    const badNotificationStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 15,
      padding: 20,
      marginBottom: 10
    }

  if (message === null) {
    return null
  }
  

  return (
    <div style={type ? goodNotificationStyle : badNotificationStyle}>
      {message}
    </div>
  )
}

const Filter = ({filter, handleFilterChange}) => {

  return (
    <div>
        filter shown with :<input value={filter} onChange={handleFilterChange}/>
    </div>
  )

}

const PersonForm = ({onSubmit, newNameVal, nameChange, newNumVal, numChange}) => {
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newNameVal} onChange={nameChange}/>
        </div>
        <div>
          number: <input value={newNumVal} onChange={numChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}

const Person = ({name, number, onClick}) => {
  return (
    <div>
      {name} {number}
      <button onClick={onClick}>delete</button>
    </div>
  )
}

const Persons = ({persons, filter, deleteButton}) => {


  return (
    <div>
        {persons.filter(({name, number}) => 
        name.toLowerCase().match(filter.toLowerCase()) != null 
        || number.toLowerCase().match(filter.toLowerCase()) != null).map(person => 
        <Person key={person.name} name={person.name} number={person.number} onClick={() => deleteButton(person.id)}/>)}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificatoinType, setNotificationType] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(({name}) => name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const idUnderUpdating = person.id
        const updatedPerson = { ...person, number: newNumber}
        personService
          .updatePerson(person.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== idUnderUpdating ? person : updatedPerson))
            setNotificationType(true)
            setNotification(
              `${updatedPerson.name} updated successfully`
            )
            setTimeout(() => {
              setNotification(null)}
              , 4000)
            setNewName('')
            setNewNumber('')

          })
          .catch(error => {
            console.log(error)
            setNotificationType(false)
            setNotification(`the person ${person.name} was already deleted from server`)
            setTimeout(() => {
              setNotification(null)
            },4000)
            setPersons(persons.filter(person => person.name !== newName))
            setNewName('')
            setNewNumber('')
          })
        
      } 
      
      
    } else {
      const newNameObj = {
        name: newName,
        number: newNumber
      }

      personService
        .createPerson(newNameObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationType(true)
          setNotification(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotification(null)}
            , 4000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotificationType(false)
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)}
            , 5000)
          setNewName('')
          setNewNumber('')
        })
    }

  }

  const deletePerson = (id) => {
    const deletingPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${deletingPerson.name}`) === true) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id ))
          setNotificationType(true)
          setNotification(`${deletingPerson.name} deleted successfully`)
          setTimeout(() => {
            setNotification(null)
          }, 4000)

        })
        .catch(error => {
          setNotificationType(false)
          setNotification(`the person ${deletingPerson.name} was already deleted from server`)
          setTimeout(() => {
            setNotification(null)
          },4000)
          setPersons(persons.filter(person => person.name !== deletingPerson.name))
        })

      console.log(`deleted ${id}`)
    } else {
      console.log('not deleted')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} type={notificatoinType}/>
      
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm 
      onSubmit={addPerson} 
      newNameVal={newName} 
      nameChange={handleNameChange} 
      newNumVal={newNumber} 
      numChange={handleNumberChange} />
      
      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} deleteButton={deletePerson}/>

    </div>
  )

}

export default App

//++++++++ tehtävä 2.17 TEHty +++++++++++++