let successTimeout
let errorTimeout

const initialState = {
  successMessage: null,
  errorMessage: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SUCCESS':
      return { ...state, successMessage: action.data.message }
    case 'UPDATE_ERROR':
      return { ...state, errorMessage: action.data.message }
    case 'RESET_SUCCESS':
      return { ...state, successMessage: null }
    case 'RESET_ERROR':
      return { ...state, errorMessage: null }
    default: return state
  }
}

export const setSuccessNotification = (message, time) => {
  return dispatch => {
    clearTimeout(successTimeout)
    successTimeout = setTimeout(() => dispatch(clearNotification('SUCCESS')), time * 1000)
    dispatch({
      type: 'UPDATE_SUCCESS',
      data: { message }
    })
  }
}

export const setErrorNotification = (message, time) => {
  return dispatch => {
    clearTimeout(errorTimeout)
    errorTimeout = setTimeout(() => dispatch(clearNotification('ERROR')), time * 1000)
    dispatch({
      type: 'UPDATE_ERROR',
      data: { message }
    })
  }
}

export const clearNotification = (type) => {
  return {
    type: `RESET_${type}`
  }
}

export default reducer