import Step from '../models/Step.js'
import * as crud from '../utils/crudHandler.js'
import asyncHandler from '../utils/asyncHandler.js'

//==========================================================
// @desc      Get all Steps
// @route     GET /api/v1/auth/Steps
// @access    Private/Admin
const getSteps = crud.getAll(Step, ['project', '  title'])

// @desc      Get single Step
// @route     GET /api/v1/auth/Steps/:id
// @access    Private/Admin
const getStep = crud.getOne(Step, ['project', 'title user'])

// @desc      Create Step
// @route     POST /api/v1/auth/Steps
// @access    Private/Admin
const createStep = crud.createOne(Step)

// @desc      Update Step
// @route     PUT /api/v1/auth/Steps/:id
// @access    Private/Admin
const updateStep = crud.updateOne(Step)

// @desc      Delete Step
// @route     DELETE /api/v1/auth/Steps/:id
// @access    Private/Admin
const deleteStep = crud.deleteOne(Step)

const MarkStepAsCompleted = asyncHandler(async (req, res) => {
  // const order = await Order.findById(req.params.id)

  console.log('--- MarkStepAsCompleted() ---')
  // console.log( req.params.id )
  const stepId = req.params.id

  const updatedStep = await Step.findByIdAndUpdate(
    stepId,
    {
      completed: true,
      completedAt: Date.now(),
    },
    { new: true }
  )

  if (updatedStep) {
    res.status(200).json({
      success: true,
      doc: updatedStep,
    })
  } else {
    res.status(404)
    throw new Error('Step not updated!')
  }
})

const addStepNote = asyncHandler(async (req, res) => {
  console.log('--- addStepNote() ---')
  const stepId = req.params.id
  const newNote = { ...req.body, date: new Date(), id: Date.now() }

  const step = await Step.findById(stepId)

  if (step) {
    const stepNotes = [...step.notes, newNote]
    step.notes = stepNotes
    const updatedStep = await step.save()
    res.json(updatedStep)
  } else {
    res.status(404)
    throw new Error('Step not found!')
  }
})
const updateStepNote = asyncHandler(async (req, res) => {
  // COMPLETE LATE
  console.log('--- updateStepNote() ---')
  const stepId = req.params.id
  const newNote = { ...req.body, date: new Date(), id: Date.now() }

  const step = await Step.findById(stepId)

  if (step) {
    const stepNotes = [...step.notes, newNote]
    step.notes = stepNotes
    const updatedStep = await step.save()
    res.json(updatedStep)
  } else {
    res.status(404)
    throw new Error('Step not found!')
  }
})

export {
  getSteps,
  createStep,
  getStep,
  updateStep,
  deleteStep,
  MarkStepAsCompleted,
  addStepNote,
}
