const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return (action.data.query)
    default: return state
  }
}

export const changeFilter = (query) => {
  return {
    type: 'SET_FILTER',
    data: { query }
  }
}

export default reducer