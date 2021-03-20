import express from 'express'
import {
  register, login, logout, getMe, protect
  // updateDetails, 
  // updatePassword
} from '../controllers/auth.cont.js'

//=================================================================
const router = express.Router()

router.post( '/register', register )
router.post( '/login', login )
router.get( '/me', protect, getMe )
router.get( '/logout', protect, logout )
// router.put( '/update-details', protect, updateDetails )
// router.put( '/update-password', protect, updatePassword )
// router.post('/forgot-password', forgotPassword)
// router.put('/reset-password/:resettoken', resetPassword)

export default router