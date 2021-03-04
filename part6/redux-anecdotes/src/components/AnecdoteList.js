import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.filter ?
      state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      : state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = (id, title) => {
    dispatch(voteAnecdote(id))
    dispatch(changeMessage(`You voted '${title}'`))
    setTimeout(() => dispatch(resetMessage()), 2000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList