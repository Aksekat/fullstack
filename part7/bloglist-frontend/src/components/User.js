import React from 'react'
import { ListGroup, Row, Col } from 'react-bootstrap'
import './User.css'

const User = ({ user }) => {

  if (!user) return null

  return (
    <Row>
      <Col lg='auto' >
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ListGroup>
          {user.blogs.map(blog => <ListGroup.Item className='truncate' key={blog.id}>{blog.title}</ListGroup.Item>)}
        </ListGroup>
      </Col>
    </Row>
  )
}

export default User