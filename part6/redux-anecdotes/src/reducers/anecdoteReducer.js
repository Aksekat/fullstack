import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const changedAnecdote = action.data
      const newState = state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      )
      return newState.sort((a, b) => b.votes - a.votes)
    }
    case 'NEW_ANECDOTE': {
      return state.concat(action.data)
    }
    case 'INIT_NOTES': {
      return action.data
    }
    default: return state
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToChange = await anecdoteService.get(id)
    anecdoteToChange.votes = anecdoteToChange.votes+1
    const changedAnecdote = await anecdoteService.update(id, anecdoteToChange)
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })

  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes
    })
  }
}

export default reducer