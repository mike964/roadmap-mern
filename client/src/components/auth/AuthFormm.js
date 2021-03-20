import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { login, clearErrors } from '../../redux/actions/auth.actions'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import Cookies from 'js-cookie'

const AuthForm = ( props ) => {
  const { toggle } = props
  const { error, isAuthenticated } = useSelector( ( state ) => state.auth )


  useEffect( () => {
    if ( isAuthenticated )
      props.history.push( '/' )

    if ( error === 'Invalid Credentials' ) {
      // setAlert( error, 'danger' )
      clearErrors()
    }
    // eslint-disable-next-line
  }, [ error, isAuthenticated, props.history ] )

  const [ user, setUser ] = useState( {
    email: '',
    password: ''
  } );

  const { email, password } = user

  const onChange = e => setUser( { ...user, [ e.target.name ]: e.target.value } )

  const onSubmit = e => {
    e.preventDefault()
    if ( email === '' || password === '' ) {
      // setAlert( 'Please fill in all fields', 'danger' )
    } else {
      console.log( user )   // output: {email: "jack@mail.com", password: "23423423"}
      // login( { email, password } )
      // findUser( { email, password } )
      login( user )

      Cookies.set( 'token', user.email, { expires: 7 } )
      toggle()
    }
  }


  return <Form onSubmit={ onSubmit }>
    <FormGroup>
      <Input
        type='email'
        name='email'
        value={ email }
        onChange={ onChange }
        placeholder="Email"
        required
      />
    </FormGroup>
    <FormGroup>
      <Input
        id='password'
        type='password'
        name='password'
        value={ password }
        onChange={ onChange }
        placeholder="Password"
        required
      />
    </FormGroup>
    <Button type='submit'>Sign in</Button>
  </Form>
}

export default AuthForm
