import React, { useEffect, useHistory } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import ProjectsPg from './pages/ProjectsPg'
import HomePg from './pages/HomePg'
import { loadUser } from './redux/actions/auth.actions'
import PrivateRoute from './components/common/PrivateRoute'
import { getMyProjects } from './redux/actions/project.actions'
import Spinnerr from './components/Spinnerr'
import Cookies from 'js-cookie'
import ProjectPg from './components/project/ProjectPg'
import Breadcrumb from './components/Breadcrumb'
import Sidebar from './components/Sidebar'
import NavBtns from './components/NavBtns'
import OveralProductivity from './pages/OveralProductivity'

const App = () => {
  console.log('# App.js Mounted.')
  // let { path, url } = useRouteMatch();

  const { isAuthenticated, loading: userLoading } = useSelector(
    (state) => state.auth,
  )

  // Check how many mounts happen on brad ecommerce

  // console.log( process.env.NODE_ENV )
  const token = Cookies.get('rodmptoken')
  console.log(token)

  useEffect(() => {
    //   props.history.push( '/projects' );
    // }
    if (token && !isAuthenticated) {
      loadUser(token)
    }
    // else {
    //   setProjects([])
    // }
    // props.history.push( '/projects' )
    // useHistory().push( '/projects' )
    // eslint-disable-next-line
  }, [isAuthenticated])

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     getMyProjects()
  //   }
  // }, [isAuthenticated])

  //=======================================================
  return (
    <>
      {userLoading ? (
        <>
          <Navbar />
          <Spinnerr />
        </>
      ) : (
        <Router>
          <header className="site-header ">
            <Navbar />
            <NavBtns />
          </header>

          {/* <div className="container-fluid p-0"> */}
          <main className="p-0 p-sm-3">
            <Switch>
              <Route exact path="/" component={HomePg} />
              {/* <Route exact path="/login" component={ LoginPg } /> */}
              <PrivateRoute path="/projects" component={ProjectsPg} />
              {/* <Route path="/projects/:projectId" component={ProjectPg} exact /> */}
              <Route path="/project/:slug" component={ProjectPg} exact />
              <Route
                path="/overal-productiv" //component={OveralProductivity} />
              >
                <h3>Hiiii</h3>
              </Route>
            </Switch>
          </main>
          {/* </div> */}
        </Router>
      )}
    </>
  )
}

export default App
