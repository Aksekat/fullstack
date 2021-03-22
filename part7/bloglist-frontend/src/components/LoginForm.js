import React from 'react'
import { handleLogin } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

const LoginForm = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(handleLogin(username, password))
    history.push('/')
  }

  return (
    <div>
      <h2>Log in</h2>
      <Form onSubmit={handleSubmit} >
        <Form.Group controlId='username'>
          <Row>
            <Col>
              <Form.Label>Username</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col lg='3'>
              <Form.Control type='text' />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId='password'>
          <Row>
            <Col>
              <Form.Label>Password</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col lg='3'>
              <Form.Control type='password' />
            </Col>
          </Row>
        </Form.Group >
        <Button className='mt-2' variant='primary' type='submit'>Log in</Button>
      </Form >
    </div >
  )
}

export default LoginForm
