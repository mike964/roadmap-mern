import express from 'express'
import { protect } from '../controllers/auth.cont.js'
import {
  getSteps,
  getStep,
  createStep,
  updateStep,
  deleteStep,
  MarkStepAsCompleted
} from '../controllers/step.cont.js'
// import { protect } from '../middleware/auth.cont.js'
import {
  setUser, checkProjectUser, checkStepUser, setProject
} from '../middleware/mdlwrs.js'
// import { addSequence } from '../middleware/sequenc.mdlwr.js'

// app.use( '/api/v1/steps' )
//====================================================================
const router = express.Router( { mergeParams: true } )


router.use( protect )
// * All routes below will use the two middlewares above


router
  .route( '/' )
  .get( checkProjectUser, getSteps )
  // .post( setProject, checkProjectUser, addSequence, createStep )
  .post( createStep )

router
  .route( '/:id' )  // stepId
  .get( checkStepUser, getStep )
  .patch( checkStepUser, updateStep )
  .delete( checkStepUser, deleteStep )
//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )

// * Mark step as finished (completed)
router.route( '/:id/complete' ).patch( MarkStepAsCompleted )

export default router