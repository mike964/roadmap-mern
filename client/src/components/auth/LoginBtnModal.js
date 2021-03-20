import React, { useState } from 'react';
// import LoginForm from './AuthFormm'
import { Button, Modal } from 'react-bootstrap'
import AuthForm from './AuthForm';

const LoginBtnModal = () => {

  const [ show, setShow ] = useState( false )
  const handleShow = () => setShow( !show )



  return <>

    <Button
      variant="primary"
      className='auth-btn signup'
      onClick={ handleShow }
    > Log In
    </Button>

    <Modal show={ show } onHide={ handleShow }>
      <Modal.Header closeButton>
        <Modal.Title>😉 Please Login </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthForm
          submitBtnTitle="Login"
          //signUp={ true }
          signUp={ false }
          handleModalShow={ handleShow }
        />
      </Modal.Body>
    </Modal>
  </>
}

export default LoginBtnModal
