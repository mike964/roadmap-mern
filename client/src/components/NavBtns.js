import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBtns = () => {
  const NavItem = ({ text, to }) => {
    return (
      <Nav.Item>
        <Link to={to} className="nav-link">
          {text}
        </Link>
      </Nav.Item>
    )
  }

  return (
    <Nav
      className="justify-content-center my-2"
      activeKey="/home"
      //onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <NavItem text="Home" to="/" />
      <NavItem text="Projects" to="/projects" />
      <NavItem text="Productivity" to="/overal-productivity" />
    </Nav>
  )
}

export default NavBtns
