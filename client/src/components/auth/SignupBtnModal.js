import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthForm from './AuthForm';

const SingupModal = () => {

  const [ show, setShow ] = useState( false )
  const handleShow = () => setShow( !show )

  return <>

    <Button
      variant="success"
      className='auth-btn signup'
      onClick={ handleShow }
    > Sign Up
  </Button>

    <Modal show={ show } onHide={ handleShow }>
      <Modal.Header closeButton>
        <Modal.Title> Register New User </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthForm
          submitBtnTitle="Submit"
          signUp={ true }
        />
      </Modal.Body>
    </Modal>
  </>
}

export default SingupModal
