import { useState } from 'react'

const Button = ( {clickEvent, text} ) => (
  <button onClick={clickEvent}>
    {text}
  </button>
)

const StatisticLine = ( {text, value} ) => {
  return(
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ( {good, neutral, bad} ) => {

  const all = good + neutral + bad

  const average = (good*1 + bad*-1)/(good + neutral + bad)

  const positive = good/(good + neutral + bad) * 100


  if (good == 0 && neutral == 0 && bad == 0 ) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )

  }

  return(
    <div>
      <h3>Statistics</h3>

      <table>
        <tbody>
          <StatisticLine text={'good'} value={good}/>
          <StatisticLine text={'neutral'} value={neutral}/>
          <StatisticLine text={'bad'} value={bad}/>
          <StatisticLine text={'all'} value={all}/>
          <StatisticLine text={'average'} value={average}/>
          <StatisticLine text={'positive'} value={positive + '%'}/>
        </tbody>
      </table>
      
    </div>
  )

}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButton = () => {
    setGood(good + 1)

  }

  const handleNeutralButton = () => {
    setNeutral(neutral + 1)

  }

  const handleBadButton = () => {
    setBad(bad + 1)

  }

  return (
    <div>
      <h1>Give feedback!</h1>

      <br></br>

      <Button clickEvent={handleGoodButton} text={'good'} />
      <Button clickEvent={handleNeutralButton} text={'neutral'} />
      <Button clickEvent={handleBadButton} text={'bad'} />

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
