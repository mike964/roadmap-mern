import React from 'react'
import { Nav } from 'react-bootstrap'

const Sidebar = () => {
  return <nav className="col-md-2 d-none d-md-block sidebar">
  <div className="sidebar-sticky">
  <ul className="nav flex-column">
  <Nav.Item>
      <Nav.Link eventKey="link-2">Dashboard</Nav.Link>
    </Nav.Item>
  <Nav.Item>
      <Nav.Link eventKey="link-2">Projects</Nav.Link>
    </Nav.Item> 
  <Nav.Item>
      <Nav.Link eventKey="link-2"> Overal productivity</Nav.Link>
    </Nav.Item> 
  
    <li className="nav-item">
      <a className="nav-link" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        Customers
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2"><line x1={18} y1={20} x2={18} y2={10} /><line x1={12} y1={20} x2={12} y2={4} /><line x1={6} y1={20} x2={6} y2={14} /></svg>
        Reports
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
        Integrations
      </a>
    </li>
    <Nav.Item>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
    </Nav.Item>
  </ul>  
</div>
</nav>
}

export default Sidebar
