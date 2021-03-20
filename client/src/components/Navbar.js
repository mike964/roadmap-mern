import React from 'react'
import { Link } from "react-router-dom"
import LoginBtnModal from './auth/LoginBtnModal'
import SignupBtnModal from './auth/SignupBtnModal'
import { useSelector } from 'react-redux'
import { logout } from '../redux/actions/auth.actions'
import AuthBtnsModal from './auth/AuthBtnsModal'


const Navbar = () => {

  const { currentUser, isAuthenticated } = useSelector( state => state.auth )
  const userLoading = useSelector( state => state.auth.loading )



  const NavDropdown = () => {
    return <li className="nav-item dropdown">
      <a className="nav-link white" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">
        <span className="bold capitalize mx-2">   { currentUser.name }</span>
        <i className="fas fa-user" />{ ' ' }<i className="fas fa-ellipsis-v" />
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="#!">Action</a>
        <a className="dropdown-item" href="#!">Another action</a>
        <div className="dropdown-divider" />
        <a className="dropdown-item" onClick={ () => logout() } > Logout </a>
      </div>
    </li>

  }

  const NavItem = ( { txt } ) => <li className="nav-item">
    <a className="nav-link" href="#">{ txt }</a>
  </li>




  //=========================================================================================
  return <nav className="navbar navbar-expand-md navbar-dark">

    <a className="navbar-brand white" href="/">ROADMAP</a>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="col"></div>
      <div className="col-auto text-right">
        <ul className="navbar-nav">
          { isAuthenticated
            ? <>   {/* AUTH LINKS */ }
              <NavItem txt="Hello" />
              <NavDropdown />
            </>
            : <>   {/* GUEST LINKS */ }
              <AuthBtnsModal />
            </> }
        </ul>
      </div>

    </div>

  </nav>
}

export default Navbar


  // < nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" >
  //   <div class="container-fluid">
  //     <a class="navbar-brand" href="#">Carousel</a>
  //     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
  //       <span class="navbar-toggler-icon"></span>
  //     </button>
  //     <div class="collapse navbar-collapse" id="navbarCollapse">
  //       <ul class="navbar-nav me-auto mb-2 mb-md-0">
  //         <li class="nav-item">
  //           <a class="nav-link active" aria-current="page" href="#">Home</a>
  //         </li>
  //         <li class="nav-item">
  //           <a class="nav-link" href="#">Link</a>
  //         </li>
  //         <li class="nav-item">
  //           <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  //         </li>
  //       </ul>
  //       <form class="d-flex">
  //         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
  //           <button class="btn btn-outline-success" type="submit">Search</button>
  //       </form>
  //     </div>
  //     </div>
  // </nav>