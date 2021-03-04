const reducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE':
      return (action.data.message)
    case 'RESET':
      return null
    default: return state
  }
}

export const changeMessage = (message) => {
  return {
    type: 'UPDATE',
    data: { message }
  }
}

export const resetMessage = () => {
  return {
    type: 'RESET'
  }
}

export default reducer