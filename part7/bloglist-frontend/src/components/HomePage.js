import React from 'react'
import LoginForm from './LoginForm'

const HomePage = ({ loggedUser }) => {

  return (
    <div>
      <h3>Welcome to the home page</h3>
      {loggedUser
        ? null
        : <div>
          <p>Log in to view blogs and users</p>
          <LoginForm />
        </div>}
    </div>
  )
}

export default HomePage