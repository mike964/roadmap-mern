import asyncHandler from '../utils/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'
import User from '../models/User.js'
import Project from '../models/Project.js'
import Step from '../models/Step.js'

// ================================================================================================

const setUser = asyncHandler(async (req, res, next) => {
  console.log('--- setUser() ---')

  // for (GET requset)
  if (req.user) {
    // req.user comes from protect mdlwr
    if (req.method === 'GET') {
      req.query = { ...req.query, user: req.user }
      return next()
    } else {
      // for (POST, Update, Delete, ...)
      req.body.user = req.user.id
      return next()
    }
  }

  next()
})

const setProject = asyncHandler(async (req, res, next) => {
  if (req.method === 'GET') {
    req.query = { ...req.query, project: req.params.projectId }
    console.log(req.params.projectId)
    return next()
  } else {
    // for (POST, Update, Delete, ...)
    req.body.project = req.params.projectId
    return next()
  }
})

const checkProjectUser = asyncHandler(async (req, res, next) => {
  // Check if project belongs to current logged in user
  // Prevent a user to get access to another user project, except 'admin'
  if (!req.user) {
    return next(new ErrorResponse(`No User !!`, 404))
  } else if (req.user.role === 'admin') {
    return next()
  } else {
    let project

    if (req.params.projectId) {
      req.params.id = req.params.projectId
    }

    // if( req.method === 'POST' )   {
    project = await Project.findById(req.params.id)

    // } else  {
    //   project = await Project.findById( req.body.project )
    // }

    if (!project) {
      return next(
        new ErrorResponse(`No doc found with id of ${req.params.id}`, 404)
      )

      // If project exist
    } else if (project.user.toString() === req.user._id.toString()) {
      // console.log( req.params )
      return next()
    } else {
      // console.log( project.user )
      // console.log( req.user )
      return next(
        new ErrorResponse(
          `User ${req.user._id} is not authorized to access this route`,
          403
        )
      )
    }
  }
})

const checkStepUser = asyncHandler(async (req, res, next) => {
  // Check if a step belongs to a project

  let step

  if (req.params.stepId) {
    req.params.id = req.params.stepId
  }

  step = await Step.findById(req.params.id).populate('project')

  console.log(step)

  if (!step) {
    return next(
      new ErrorResponse(`No doc found with id of ${req.params.id}`, 404)
    )
  }

  if (
    step.user.toString() === req.user._id.toString() ||
    req.user.role === 'admin'
  ) {
    // console.log( req.params )
    return next()
  } else {
    // console.log( project.user )
    // console.log( req.user )
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to access this route`,
        403
      )
    )
  }
})

export { setUser, setProject, checkProjectUser, checkStepUser }
