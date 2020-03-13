import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({text, value}) => (
  <>
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  </>
)

const Statistics = ({good, neutral, bad}) => {

  if(good+neutral+bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text='Good' value={good}></Statistic>
            <Statistic text='Neutral' value={neutral}></Statistic>
            <Statistic text='Bad' value={bad}></Statistic>
            <Statistic text='Average' value={(good-bad)/(good+neutral+bad)}></ Statistic>
            <Statistic text='Positive' value={good/(good+neutral+bad)*100 + ' %'}></Statistic>
          </tbody>
        </table>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text='Good'></Button>
      <Button handleClick={()=>setNeutral(neutral+1)} text='Neutral'></Button>
      <Button handleClick={()=>setBad(bad+1)} text='Bad'></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));