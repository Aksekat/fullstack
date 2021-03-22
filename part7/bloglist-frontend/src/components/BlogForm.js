import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button, Col, Row } from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {

  const dispatch = useDispatch()

  const addBlog = event => {
    event.preventDefault()

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    dispatch(createBlog(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  return (
    <>
      <h2>Add new blog</h2>
      <Form onSubmit={addBlog} className='mt-3'>
        <Form.Group as={Row} controlId='title'>
          <Form.Label column md={1} sm={2}>Title:</Form.Label>
          <Col sm={5}>
            <Form.Control type='text' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='author'>
          <Form.Label column md={1} sm={2}>Author:</Form.Label>
          <Col sm={5}>
            <Form.Control type='text' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='url'>
          <Form.Label column md={1} sm={2}>URL:</Form.Label>
          <Col sm={5}>
            <Form.Control type='text' />
          </Col>
        </Form.Group>
        <Button className='mb-2 mt-2 sm-block' id='createButton' type='submit'>Add</Button>
      </Form>
    </>
  )
}

export default BlogForm