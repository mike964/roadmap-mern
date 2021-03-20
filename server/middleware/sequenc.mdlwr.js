// const asyncHandler from './async.mdlwr' )
// const ErrorResponse from '../utils/errorResponse' )
// const User from '../models/User' )
// const Project from '../models/Project' )
// const Step from '../models/Step' )



// // add  sequence field to document when creating one
// // add sequence to step 
// const addSequence = asyncHandler( async ( req, res, next ) => {
//   // first get all steps of project

//   // Get steps for current Project using req.params
//   const steps = await Step.find( { project: req.params.projectId } )
//   // console.log( steps )

//   // Add sequence to step obj
//   req.body = {
//     ...req.body,
//     sequence: steps.length + 1,
//   }

//   next()

// } )




