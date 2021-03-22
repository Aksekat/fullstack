import React, { useRef } from 'react'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import Togglable from './Togglable'

const BlogPage = () => {

  const blogFormRef = useRef()

  return (
    <div className='blogPage'>
      <Togglable buttonLabel='Add blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default BlogPage