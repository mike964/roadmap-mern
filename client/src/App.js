import React, { useEffect, useHistory } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider, useSelector } from 'react-redux'
import Navbar from './components/Navbar';
import ProjectsPg from './pages/ProjectsPg';
import HomePg from './pages/HomePg';
import { loadUser } from './redux/actions/auth.actions'
import PrivateRoute from './components/common/PrivateRoute';
import { getMyProjects } from './redux/actions/project.actions';
import Spinnerr from './components/Spinnerr'
import Cookies from 'js-cookie'
import ProjectPg from './components/project/ProjectPg';
import Breadcrumb from './components/Breadcrumb';

const App = () => {
  console.log( '# App.js Mounted.' )
  // let { path, url } = useRouteMatch();

  const { isAuthenticated, loading: userLoading } = useSelector( state => state.auth )

  const token = Cookies.get( 'rodmptoken' )

  // Check how many mounts happen on brad ecommerce


  // console.log( process.env.NODE_ENV )

  useEffect( () => {
    //   props.history.push( '/projects' );
    // } 
    if ( token ) {
      loadUser( token )
    }
    // else {
    //   setProjects([])
    // }
    // props.history.push( '/projects' )
    // useHistory().push( '/projects' )

    // eslint-disable-next-line
  }, [] )

  useEffect( () => {
    if ( isAuthenticated ) {
      getMyProjects()
    }
  }, [ isAuthenticated ] )

  //=======================================================
  return <>

    { userLoading ?
      <>
        <Navbar />
        <Spinnerr />
      </>
      :
      <Router>
        <header className="site-header ">
          <Navbar />
        </header>
        <main className="py-5">
          <div className="container p-0">
            <Breadcrumb />
            <Switch>
              <Route exact path="/" component={ ProjectsPg } />
              {/* <Route exact path="/projects" component={ ProjectsPg } /> */ }
              <PrivateRoute exact path="/projects" component={ ProjectsPg } />
              {/* <Route exact path="/login" component={ LoginPg } /> */ }
              <Route path={ `/projects/:projectName/:projectId` }  >
                <ProjectPg />
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
    }
  </>

}

export default App;
