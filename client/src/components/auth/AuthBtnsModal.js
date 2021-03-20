import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import AuthModal from './AuthModal';

const AuthBtnsModal = () => {

  const [ showAuthModal, setShowAuthModal ] = useState( '' ) //  ['signup' - login - ' null]

  const handleShow = () => { }


  // const handleAuthBtnClick = ( x ) => {
  //   // x : login-signup
  //   setShowAuthModal( x || !showAuthModal )
  // }

  // const handleSignupModal = ( x ) => setShowSingupModal( x || !showSingupModal )
  // const handleLoginModal = ( x ) => setShowLoginModal( x || !showLoginModal )



  return <>
    <button className="auth-btn" onClick={ () => setShowAuthModal( 'signup' ) }
    > Sign up
   </button>
    {' ' }
    <button className="auth-btn" onClick={ () => setShowAuthModal( 'login' ) }
    > Log in
    </button>

    {/* Auth Modal for Login/Signup */ }
    {showAuthModal === 'signup' &&
      <AuthModal
        show={ true }
        handleShow={ setShowAuthModal }
        signup
      /> }

    {showAuthModal === 'login' &&
      <AuthModal
        show={ true }
        handleShow={ setShowAuthModal }
        signup={ false }
      /> }
  </>
}

export default AuthBtnsModal
