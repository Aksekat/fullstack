import React, { useEffect } from 'react'
import './App.css'
import BlogPage from './components/BlogPage'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import BlogInfo from './components/BlogInfo'
import PrivateRoute from './components/PrivateRoute'
import NavBar from './components/NavBar'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { handleLogout } from './reducers/loginReducer'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch, user])

  const logout = () => {
    dispatch(handleLogout())
    history.push('/')
  }

  const userMatch = useRouteMatch('/users/:id')
  const userToView = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToView = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <>
      <NavBar logout={logout} user={user} />
      <div className='container'>
        <div className='body' >
          <Notification className='notification' />
          <Switch>
            <PrivateRoute component={BlogInfo} loggedUser={user} blog={blogToView} user={user} path="/blogs/:id" />
            <PrivateRoute component={User} loggedUser={user} user={userToView} path="/users/:id" />
            <PrivateRoute component={Users} loggedUser={user} users={users} path="/users" />
            <PrivateRoute component={BlogPage} loggedUser={user} path="/blogs" />
            <Route path='/login'>
              <LoginForm />
            </Route>
            <Route path='/'>
              <HomePage loggedUser={user} />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default App