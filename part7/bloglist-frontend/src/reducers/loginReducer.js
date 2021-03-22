import blogService from '../services/blogs'
import loginService from '../services/login'
import { setSuccessNotification, setErrorNotification } from './notificationReducer'

const reducer = (state = JSON.parse(window.localStorage.getItem('loggedBloglistUser')), action) => {
  switch (action.type) {
    case 'SET_LOGIN': return action.data
    case 'RESET_LOGIN': return null
    default: return state
  }
}

export const handleLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setSuccessNotification('Logged in', 5))
      dispatch({
        type: 'SET_LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch(setErrorNotification('Wrong username or password', 5))
    }
  }
}

export const handleLogout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setSuccessNotification('Logged out', 5))
    dispatch({ type: 'RESET_LOGIN' })
  }
}

export default reducer
