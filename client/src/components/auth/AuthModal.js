import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import AuthForm from './AuthForm';

const AuthModal = ( { show, handleShow, signup } ) => <Modal show={ show } onHide={ () => handleShow( false ) } size='sm'>
  <div className="modal-header p-2">
    <span className="em-12 bold">{ signup ? "Sign up new user" : "Log in" }</span>
  </div>
  <div className="p-3">
    <AuthForm
      signup={ signup }
      submitBtnTitle={ signup ? 'Submit' : 'Log in' }
    />
  </div>
</Modal>

export default AuthModal
