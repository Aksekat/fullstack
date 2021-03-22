import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import './Blogs.css'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th><h3>Title</h3></th>
            <th className='d-none d-lg-table-cell'><h3>Added by</h3></th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td className='d-none d-lg-table-cell'>
                {blog.user.name}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs