import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const NavBar = ({ user, logout }) => (
  <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
    <div className='container'>
      <Navbar.Brand as={Link} to='/' >BlogList</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav>
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/blogs'>Blogs</Nav.Link>
          <Nav.Link as={Link} to='/users'>Users</Nav.Link>
        </Nav>
        <Nav className='ml-auto'>
          {user
            ? <>
              <Navbar.Text className='mr-2'>
                <em>Logged in as: {user.name}</em>
              </Navbar.Text>
              <Button variant='outline-light' onClick={logout}>Log out</Button>
            </>
            : <Nav.Link as={Link} to='/login'>Login</Nav.Link>}
        </Nav>
      </Navbar.Collapse >
    </div>
  </Navbar >
)

export default NavBar