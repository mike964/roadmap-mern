import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loginUser, clearErrors, signupUser } from '../../redux/actions/auth.actions'
import { Form, Button } from 'react-bootstrap'

//=========================================================================
const AuthForm = ( { signup, submitBtnTitle, handleModalShow } ) => {
  // "AuthForm" is used both for login and signup users

  const [ state, setState ] = useState( {
    name: '',
    email: '',
    password: '',
    password2: ''
  } );

  const { name, email, password, password2 } = state

  const onChange = e => setState( { ...state, [ e.target.name ]: e.target.value } )


  const handleLogin = async e => {
    e.preventDefault()
    console.log( "test handleLogin" )

    if ( email === '' || password === '' ) {
      // setAlert( 'Please fill in all fields', 'danger' )
    } else {
      const user = {
        email,
        password
      }
      console.log( user )

      // handleModalShow()

      // setShowSpinner( true ) 

      let success = await loginUser( user )

      if ( success ) {
        // If Login Successful
        // setShowSpinner( false )   // disappear spinner
        if ( handleModalShow )
          handleModalShow()   // Hide modal - if Modal Exist 

        //  loadUser_()   // load user prds, msgs, ... 
        // history.push( '/matches' )    // * Redirect to /matches page  
      }
      //   } else {
      //   If Login Fail
      //     setShowSpinner( false )
      //   st_showAlert( true )
      //     setErrorMsg( 'Login failed! Wrong email or password.' )
      //      setTimeout( () => setErrorMsg( '' ), 3000 )   // Disapper after 3 seconds
    }
  }


  const handleSignup = e => {
    e.preventDefault()
    console.log( "test handleSignup" )

    const user = {
      name,
      email,
      password
    }


    if ( email === '' || password === '' ) {
      console.log( 'Please enter all fields' )
    } else {

      signupUser( user )
    }

  }



  //====================================================================
  return <Form onSubmit={ signup ? handleSignup : handleLogin }>

    { signup && <Form.Group controlId="authFormName">
      <Form.Control
        type="text"
        placeholder="Name"
        name='name'
        value={ name }
        onChange={ onChange }
        required
      />
    </Form.Group> }

    <Form.Group controlId="authFormEmail">
      <Form.Control
        type="email"
        placeholder="Email"
        name='email'
        value={ email }
        onChange={ onChange }
        required
      />
      <Form.Text className="text-muted">
        Well never share your email with anyone else.
    </Form.Text>
    </Form.Group>

    <Form.Group controlId="authFormPassword">
      <Form.Control
        type="password"
        placeholder="Password"
        name='password'
        value={ password }
        onChange={ onChange }
        required
      />
    </Form.Group>

    { signup && <Form.Group controlId="authFormPassword2">
      <Form.Control
        type="password"
        placeholder="Confirm password"
        name='password2'
        value={ password2 }
        onChange={ onChange }
        required
      />
    </Form.Group> }

    <Button variant="primary" type="submit">
      { submitBtnTitle }
    </Button>
  </Form>
}

export default AuthForm 