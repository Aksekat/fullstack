const reducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE':
      return (action.data.message)
    case 'RESET':
      return null
    default: return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    setTimeout(() => dispatch(clearNotification()), time*1000)
    dispatch({
      type: 'UPDATE',
      data: { message }
    })
  }
}
export const clearNotification = () => {
  return {
    type: 'RESET'
  }
}

export default reducer