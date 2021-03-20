import store from '../store'
const { dispatch } = store




const toggleHideNotes = ( x ) => {
  dispatch( {
    type: 'TOGGLE_HIDE_NOTES',
    payload: x    // Boolean
  } )
}

const toggleHidecompleted = ( x ) => {
  // toggle hide completed todos
  dispatch( {
    type: 'TOGGLE_HIDE_COMPLETED',
    payload: x    // Boolean
  } )
}

export {
  toggleHideNotes,
  toggleHidecompleted
}