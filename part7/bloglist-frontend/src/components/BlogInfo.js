import React from 'react'
import { useDispatch } from 'react-redux'
import { updateLikes, createComment, deleteBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const BlogInfo = ({ blog, user }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  //const userId = user.id
  //JSON.parse(window.localStorage.getItem('loggedBloglistUser')).id

  if (!blog) return null

  const createdByUser = blog.user.id === user.id

  const addLike = () => {
    dispatch(updateLikes(blog.id))
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment(blog.id, event.target.comment.value))
    event.target.comment.value = ''
  }

  const removeBlog = () => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      dispatch(deleteBlog(blog.id))
      history.push('/blogs')
    }
  }

  return (
    <div className='blog'>
      <h2 className='text-break'>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p className='mt-3'>
        <span className='likes'>{blog.likes} likes</span>
        <Button className='likeButton ml-2' onClick={addLike}>Like</Button>
      </p>
      <p>{blog.user.name}</p>
      {!createdByUser || <Button variant='danger' className='mb-3' onClick={removeBlog}>Delete blog</Button>}
      <h3>Add comment</h3>
      <Form onSubmit={addComment}>
        <Form.Group controlId='comment'>
          <Form.Control as='textarea' />
        </Form.Group>
        <Button type='submit'>Add comment</Button>
      </Form>
      <h3 className='mt-3'>Comments</h3>
      <ul className='text-break'>
        {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div>
  )
}

export default BlogInfo