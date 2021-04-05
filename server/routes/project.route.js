import express from 'express'
// import { protect, restrictedTo } from '../middleware/auth.cont.js'
import { setUser, checkProjectUser, setProject } from '../middleware/mdlwrs.js'
import { createProject, getProjects, getProject, updateProject, deleteProject } from '../controllers/project.cont.js'
import { protect } from '../controllers/auth.cont.js'
import stepRoutes from './step.route.js'



//==========================================================
const router = express.Router()

// router.use( protect )   // * All routes below will use protect() mdlwr  

router
  .route( '/' )
  // .get( restrictedTo( 'admin' ), getProjects )
  .get( getProjects )
  .post( protect, createProject )

router.route( '/me' )
  .get( setUser, getProjects )

router.use( protect )   // * All routes below will use protect() mdlwr 

// @todo: Check project user before getting single project by id
router.route( '/:id' )
  .get( getProject )
  .patch( updateProject )
  // .delete( checkProjectUser, deleteProject )
  .delete( deleteProject )

// Get Steps of a Project - Re-route into other router
router.use( '/:projectId/steps', setProject, stepRoutes )
// router.use( '/steps', stepRoutes )


export default router