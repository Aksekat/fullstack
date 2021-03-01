import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import ErrorNotification from './components/ErrorNotification'
import ChangeNotification from './components/ChangeNotification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [changeMessage, setChangeMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setChangeMessage('Logged in')
      setTimeout(() => { setChangeMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setChangeMessage('Logged out')
    setTimeout(() => { setChangeMessage(null) }, 5000)
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      setChangeMessage(`${returnedBlog.title} added`)
      setTimeout(() => { setChangeMessage(null) }, 5000)
    } catch (error) {
      setErrorMessage('Blog creation failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const updateLikes = async (id) => {
    try {
      const blog = await blogService.get(id)
      blog.likes++
      const returnedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : { ...blog, likes: returnedBlog.likes }))
      setChangeMessage(`Liked ${returnedBlog.title}`)
      setTimeout(() => { setChangeMessage(null) }, 5000)
    } catch (error) {
      setErrorMessage('Updating likes failed')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    const toBeDeleted = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete blog "${toBeDeleted.title}"?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => (blog.id !== id)))
        setChangeMessage(`Deleted blog "${toBeDeleted.title}"`)
        setTimeout(() => { setChangeMessage(null) }, 5000)
      } catch (error) {
        setErrorMessage(`Deleting blog "${toBeDeleted.title}" failed`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <ErrorNotification message={errorMessage} />
        <ChangeNotification message={changeMessage} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ErrorNotification message={errorMessage} />
      <ChangeNotification message={changeMessage} />
      <BlogPage
        blogs={blogs}
        user={user}
        handleLogout={handleLogout}
        createBlog={addBlog}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
        blogFormRef={blogFormRef} />
    </div>
  )
}

export default App