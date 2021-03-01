import React from 'react'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogPage = ({ blogs, user, handleLogout, createBlog, updateLikes, blogFormRef, deleteBlog }) => {
  return (
    <div className='blogPage'>
      <p>{user.name} logged in
        <button onClick={handleLogout}>Log out</button>
      </p>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Blogs blogs={blogs} user={user} updateLikes={updateLikes} deleteBlog={deleteBlog} />
    </div>
  )
}

BlogPage.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogPage