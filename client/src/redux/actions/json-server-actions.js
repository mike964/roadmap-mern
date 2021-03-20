/* eslint-disable no-undef */
// Old json-server actions - before connecting to MONGODB API
export const loadUserr = async () => {

  try {
    // const res = await axios.get( '/api/auth' )
    const x = localStorage.getItem( "token" )
    console.log( x )

    if ( x === null ) { // user doesn't exist
      // throw Error( 'User not found' )
    } else {
      const res = await fetch( `/users?q=${ x }`, {
        method: 'GET',
      } )

      const data = await res.json()

      // console.log( data[ 0 ] )    // {name, email, ...}

      dispatch( {
        type: 'LOAD_USER',
        payload: data[ 0 ]
      } )

      getProjectsOfUserFromDB( data[ 0 ].id )
      getStepsOfUserFromDB( data[ 0 ].id )
    }

  } catch ( err ) {
    console.log( err )
  }
}

export const getAllProjects = async () => {
  // try {
  // const res = await axios.get( '/projects' )
  const res = projects
  // console.log( res.data )
  // return res.data
  dispatch( {
    type: 'SET_PROJECTS',
    payload: res
  } )
  // } catch ( err ) {
  // console.log( err )
  // }
}

export const getProjectsOfUser = async () => {

  const allProjects = await getAllProjects()
  const userId = localStorage.getItem( "token" )
  const res = []

  allProjects.forEach( ( item, index ) => {
    if ( item.userId === userId ) {
      res.push( item )
    }
  } )
  // console.log( res )
  // return res
  dispatch( {
    type: 'SET_PROJECTS',
    payload: res
  } )
}

export const getProjectsOfUserFromDB = async ( userId ) => {
  try {
    // Get all projects of a user
    const res = await axios.get( `/users/${ userId }/projects` )
    // console.log( res )

    dispatch( {
      type: 'SET_PROJECTS',
      payload: res.data
    } )
  } catch ( err ) {
    console.lor( err )
  }
}

export const addProjectt = async ( project ) => {
  try {
    // First Add project to DB 
    const newProject = {
      ...project,
      id: randomNumber12(),
      createdAt: Date.now()
    }
    const res = await axios.post( '/projects', newProject )
    // console.log( res.data )

    // Then Add project to redux state
    dispatch( {
      type: 'ADD_PROJECT',
      payload: res.data
    } )
  } catch ( err ) {
    console.log( err )
  }
}

export const addStepp = async ( step ) => {
  try {
    // First add step to DB
    const newStep = {
      ...step,
      id: randomNumber16(),
      createdAt: Date.now(),
      finishedAt: null
    }

    const res = await axios.post( '/steps', newStep )

    // Then add step to redux state
    dispatch( {
      type: 'ADD_STEP',
      // payload: step
      payload: res.data
    } )

    // reload steps for current project
    getStepsofProject()

  } catch ( err ) {
    console.lor( err )
  }
}

// Get Steps for current poject
export const getStepsofProjectt = ( steps, projectId ) => {
  let res = []
  let stepss
  let projectIdd

  // Check if this function has inputs
  if ( steps && projectId ) {
    stepss = steps
    projectIdd = projectId
  } else {
    // Else Get all steps from redux state
    stepss = getState().step.steps
    projectIdd = getState().project.currentProject.id
  }

  stepss.forEach( stp => {
    if ( stp.projectId === projectIdd )
      res.push( stp )
  } )

  // console.log( res )

  dispatch( {
    type: 'SET_CURRENT_PROJECT_STEPS',
    payload: res
  } )
}


export const updateStep = async ( updatedStep, id ) => {
  try {
    const res = await axios.patch( `/steps/${ id }`, updatedStep )

    // console.log( res.data )

    // Update Redux State
    dispatch( {
      type: 'UPDATE_STEP',
      payload: res.data   // res.data is the whole updated step
    } )
    // Reload steps for redux current project  after delete
    getStepsofProject()

  } catch ( err ) {
    console.log( err )
  }
}