import * as crud from '../utils/crudHandler.js'
import Project from '../models/Project.js'
import { restrictedTo } from './auth.cont.js'
import asyncHandler from '../utils/asyncHandler.js'
import slugify from 'slugify'

//============================================================
// const createProject = crud.createOne( Project )
const getProject = crud.getOne(Project)

const getProjects = crud.getAll(Project)

const createProject = asyncHandler(async (req, res, next) => {
  console.log('--- createProject() cont ---')

  let newProject = {
    user: req.user._id,
    ...req.body,
  }
  // console.log( newProject )

  const project = await Project.create(newProject)

  res.status(201).json({
    success: true,
    project,
  })
})

// const updateProject = crud.updateOne( Project )
const updateProject = async (req, res, next) => {
  // console.log( req.body )
  try {
    // const doc = await Project.updateOne( req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // } )

    let project_ = { ...req.body }
    const project = await Project.findById(req.params.id)

    // console.log( project )  // {..project}

    if (!project.slug || req.body.name) {
      project_.slug = slugify(req.body.name ? req.body.name : project.name, {
        lower: true,
      })
    }

    // console.log('-- project to be updated')
    // console.log(project_)

    const doc = await Project.findByIdAndUpdate(project._id, project_, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      doc,
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteProject = crud.deleteOne(Project)

// * Get single Project by slug name
const getProjectBySlug = asyncHandler(async (req, res, next) => {
  console.log('-- getProjectBySlug()')

  console.log(req.params)

  // let newProject = {
  //   user: req.user._id,
  //   ...req.body,
  // }
  // // console.log( newProject )

  // const project = await Project.create(newProject)
  let project = await Project.find({ slug: req.params.slug })

  if (project[0]) {
    res.status(201).json({
      success: true,
      project: project[0],
    })
  } else {
    res.status(401).json({
      success: false,
    })
  }
})

export {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectBySlug,
}
