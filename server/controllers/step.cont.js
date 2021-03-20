import Step from '../models/Step.js'
import * as crud from '../utils/crudHandler.js'
import asyncHandler from '../utils/asyncHandler.js'

//==========================================================
// @desc      Get all Steps
// @route     GET /api/v1/auth/Steps
// @access    Private/Admin
const getSteps = crud.getAll( Step, [ 'project', '  title' ] )

// @desc      Get single Step
// @route     GET /api/v1/auth/Steps/:id
// @access    Private/Admin
const getStep = crud.getOne( Step, [ 'project', 'title user' ] )

// @desc      Create Step
// @route     POST /api/v1/auth/Steps
// @access    Private/Admin
const createStep = crud.createOne( Step )

// @desc      Update Step
// @route     PUT /api/v1/auth/Steps/:id
// @access    Private/Admin
const updateStep = crud.updateOne( Step )

// @desc      Delete Step
// @route     DELETE /api/v1/auth/Steps/:id
// @access    Private/Admin
const deleteStep = crud.deleteOne( Step )

export { getSteps, createStep, getStep, updateStep, deleteStep }