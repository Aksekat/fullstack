import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(10))
  
  const randomAnecdote = () => {
    let ind
    do {
      ind = Math.floor(Math.random()*anecdotes.length)
    } while(ind === selected)
    setSelected(ind)
  }

  const voteForAnecdote = () => {
    const points = [...votes]
    points[selected] += 1
    setVotes(points)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes.</p>
      <span>
        <Button handleClick={() => voteForAnecdote()} text='Vote'></Button>
        <Button handleClick={() => randomAnecdote()} text='Next anecdote'></Button>
      </span>
      <h2>Anecdote with most votes</h2>
      {/* Not efficient, but performance shouldn't become an issue here */}
      <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p></p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)