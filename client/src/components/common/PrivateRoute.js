import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to home page page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default PrivateRoute

// FUK : PROBLEM

//       isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
