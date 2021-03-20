import * as crud from '../utils/crudHandler.js'
import Project from '../models/Project.js'
import { restrictedTo } from './auth.cont.js'
import asyncHandler from '../utils/asyncHandler.js'

//============================================================
// const createProject = crud.createOne( Project )
const getProject = crud.getOne( Project )
const getProjects = crud.getAll( Project )

const createProject = asyncHandler( async ( req, res, next ) => {
  console.log( '--- createProject() cont ---' )

  let newProject = {
    user: req.user._id,
    ...req.body
  }
  // console.log( newProject )

  const project = await Project.create( newProject )

  res.status( 201 ).json( {
    success: true,
    project
  } )
} )


// const updateProject = crud.updateOne( Project )
const updateProject = async ( req, res, next ) => {
  try { 
    const doc = await Project.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
      runValidators: true
    } )

    res.status( 200 ).json( {
      success: true,
      doc
    } )

  } catch ( error ) {
    console.log( error )
  }
}



const deleteProject = crud.deleteOne( Project )

export { createProject, getProjects, getProject, updateProject, deleteProject }
