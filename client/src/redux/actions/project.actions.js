/* eslint-disable no-undef */
import axios from 'axios'
import store from '../store'
import { projects } from '../../utils/_data'
import { randomNumber12 } from '../../utils/functions'
import { setReqHeaders } from './auth.actions'
import axos from '../../utils/axos'
const { dispatch, getState } = store
// const { userId } = getState().auth.currnetUser.id
// console.log( getState() )

const setCurrnetProject = (project) => {
  // console.log( project )   // good
  dispatch({
    type: 'SET_CURRENT_PROJECT',
    payload: project,
  })
}

const setProjectLoading = (project) => {
  // console.log( project )   // good
  dispatch({
    type: 'SET_CURRENT_PROJECT',
    payload: project,
  })
}

const getProjectById = async (id) => {
  // ** GET single project by Id

  console.log('--- getProjectById() ')

  setReqHeaders()
  let success = false

  try {
    const response = await axos.get(`/api/projects/${id}`)
    console.log(response)
    setCurrnetProject(response.data.data)

    success = true
  } catch (error) {
    setProjectsLoading(false)
  }

  return success
}

const getProjectBySlug = async (slug) => {
  // ** GET single project by Id

  setReqHeaders()
  let success = false

  try {
    const response = await axos.get(`/api/projects/slug/${slug}`)
    console.log(response)
    setCurrnetProject(response.data.project)

    success = true
  } catch (error) {
    setProjectsLoading(false)
  }

  return success
}

// ** Get project of current logged in user
const getMyProjects = async () => {
  setProjectsLoading(true)

  // First set req.headers . auth in order to pass protected route
  setReqHeaders()

  try {
    const response = await axos.get(`/api/projects/me`)
    console.log(response)
    dispatch({
      type: 'SET_PROJECTS',
      payload: response.data.docs,
      // payload: projects                   // * mock data - when no server
    })
  } catch (error) {
    setProjectsLoading(false)
    return false
  }
  // console.log( 'fuk u pic shit' )   // doesn't display if error
}

const setProjectsLoading = (x) => {
  dispatch({
    type: 'SET_PROJECT_LOADING',
    payload: x, // boolean
  })
}

const addProject_DB = async (newProject) => {
  try {
    // * First Add project to DB

    // setReqHeaders()
    const response = await axos.post(`/api/projects`, newProject)
    console.log(response)

    // * Then Add project to redux store
    dispatch({
      type: 'ADD_PROJECT',
      payload: response.data.project,
      // payload: newProject   // * mock data
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

const updateProject_DB = async (projectId, reqBody) => {
  try {
    const res = await axos.patch(`/api/projects/${projectId}`, reqBody)

    console.log(res.data)
    const project = res.data.doc

    // Update Redux State
    dispatch({
      type: 'UPDATE_PROJECT',
      project, // res.data is the whole updated project
      id: project._id,
    })

    setCurrnetProject(project)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

const deleteProject = async (projectId) => {
  try {
    // await fetch( `/logs/${ id }`, { method: 'DELETE'  // } );

    // await axos.delete( `/projects/${ id }` )
    const response = await axos.delete(`/api/projects/${projectId}`)
    console.log(response)
    // // DELETE STEP from REDUX after DB
    dispatch({ type: 'DELETE_PROJECT', id: projectId })
  } catch (err) {
    console.log(err)
  }
}

export {
  getMyProjects,
  getProjectById,
  getProjectBySlug,
  addProject_DB,
  setCurrnetProject,
  updateProject_DB,
  deleteProject,
}
