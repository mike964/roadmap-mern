import express from 'express'
import { protect, restrictedTo } from '../middleware/auth.const.js'
import { createUser, getUsers } from '../controllers/user.cont'
import { getSteps } from '../controllers/step.cont.js'
import userRouter from './users.route'

//=============================================================
const router = express.Router()

// Only user.role = admin can crud users
router.use( protect )
router.use( restrictedTo( 'admin' ) )
// All routes below will use the two middlewares above

router
  .route( '/steps' )
  .get( getSteps )

router.use( '/users', userRouter )

// router.route( '/:id' )
//   .delete( deleteUser )
//   .put( updateUser )


export default router