/* eslint-disable no-undef */
import axios from 'axios'
import store from '../store'
// import { steps } from './mock-data'
import { randomNumber16 } from '../../utils/functions'
import { setReqHeaders } from './auth.actions'
import { sortBy } from './sort.actions'
import axos from '../../utils/axos';
const { dispatch, getState } = store



// Get Steps for current poject
export const getStepsofProject = async ( projectId ) => {
  console.log( '--- getStepsofProject()' )
  // console.log( getState().project.currentProject )
  // const { currentProject } = getState().project
  // const { steps } = getState().step



  setReqHeaders()

  try {
    const response = await axos.get( `/api/projects/${ projectId }/steps` )
    console.log( response )
    // return response.data.docs  // steps

    // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
    const steps = response.data.docs.sort( ( a, b ) => ( a.createdAt > b.createdAt ) ? 1 : ( ( b.createdAt > a.createdAt ) ? -1 : 0 ) )

    dispatch( {
      type: 'SET_STEPS',
      payload: steps
    } )
    // return response.data.docs   // steps

  } catch ( error ) {
    return false
  }
}


// Add Step to Redux State
export const addStep_DB = async ( step ) => {
  try {
    console.log( step )
    // setReqHeaders()

    // const projectId = getState().project.currentProject._id
    const response = await axos.post( `/api/steps`, step )

    console.log( response )
    // Then add step to redux state
    dispatch( {
      type: 'ADD_STEP',
      // payload: step
      payload: response.data.data
    } )

    return true
    // reload steps for current project
    // getStepsofProject()

  } catch ( err ) {
    console.log( err )
    return false
  }
}


export const updateStep = async ( stepId, step_ ) => {
  // * step_ => updated step
  try {
    // {{URL}}/api/v1/projects/steps/5ee297b1982d934ac0985c98
    // setReqHeaders()
    const res = await axos.patch( `/api/steps/${ stepId }`, step_ )

    console.log( res )

    // Update Redux State after adding to DB
    dispatch( {
      type: 'UPDATE_STEP',
      payload: res.data.data   // res.data is the whole updated step
    } )
    // Reload steps for redux current project  after delete
    // getStepsofProject()

  } catch ( err ) {
    console.log( err )
  }
}

export const deleteStep_DB = async ( stepId ) => {
  try {
    // await fetch( `/logs/${ id }`, { method: 'DELETE'  // } );

    // await axos.delete( `/steps/${ stepId }` )
    const res = await axos.delete( `/api/steps/${ stepId }` )
    // console.log( res )

    // // DELETE STEP from REDUX after DB
    dispatch( {
      type: 'DELETE_STEP',
      payload: stepId
    } )
    // Reload steps for redux current project  after delete
    // getStepsofProject()

  } catch ( err ) {
    console.log( err )
  }
}
