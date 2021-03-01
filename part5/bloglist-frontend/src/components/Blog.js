import React, { useState } from 'react'
const Blog = ({ blog, user, updateLikes, deleteBlog }) => {

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)
  const createdByUser = blog.user.username === user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = event => {
    event.preventDefault()
    updateLikes(blog.id)
    //updateLikes({ ...blog, user: blog.user.id })
  }

  const removeBlog = event => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  if (expanded) {
    return (
      <li className='blog' style={blogStyle}>
        <p>{blog.title} {blog.author} <button onClick={toggleExpanded}>Hide</button></p>
        <p>{blog.url}</p>
        <p><span className='likes'>{blog.likes}</span><button className='likeButton' onClick={addLike}>Like</button></p>
        <p>{blog.user.name}</p>
        {!createdByUser || <button onClick={removeBlog}>Remove</button>}
      </li>
    )
  }

  return (
    <li style={blogStyle}>
      {blog.title} {blog.author} <button className='viewButton' onClick={toggleExpanded}>View</button>
    </li>
  )
}


export default Blog
