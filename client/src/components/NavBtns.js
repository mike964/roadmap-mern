import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavItem = (props) => {
  const { to, children } = props
  return (
    <Nav.Item>
      <Link to={to} className="nav-link">
        {children}
      </Link>
    </Nav.Item>
  )
}

const NavBtns = () => {
  return (
    <div className="container">
      <Nav
        className="justify-content-center my-3 bb fw-500"
        activeKey="/home"
        //onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        style={{ borderBottom: '4px solid #e0e0e0' }}
      >
        {/* <NavItem text="Home" to="/"> Home </NavItem> */}
        <NavItem text="Home" to="/dashboard">
          <i className="fas fa-tachometer-alt" /> Dashboard
        </NavItem>
        <NavItem text="Projects" to="/projects">
          <i className="fas fa-folder-open" /> Projects
        </NavItem>
        <NavItem text="Overview" to="/overview">
          <i className="fas fa-chart-bar" /> Overview
        </NavItem>
      </Nav>
    </div>
  )
}

export default NavBtns
