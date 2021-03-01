import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user, updateLikes, deleteBlog }) => {

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <ul className='blogs' style={{ listStyleType: 'none' }}>
        {sortedBlogs.map(blog => <Blog key={blog.id} user={user} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />)}
      </ul>
    </div>
  )
}

export default Blogs