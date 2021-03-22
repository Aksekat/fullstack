import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <td><h3>Username</h3></td><td><h3>Blogs created</h3></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Users