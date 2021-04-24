const initState = {
  hideNotes: false, // when click switch hide notes in step list of project pg
  hideCompleted: false, // hide completed todos in step list
  sortProjectsBy: '', // createdAt - updatedAt - name
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_HIDE_NOTES':
      return {
        ...state,
        hideNotes: action.payload, // Boolean
      }
    case 'TOGGLE_HIDE_COMPLETED':
      return {
        ...state,
        hideCompleted: action.payload, // Boolean
      }
    case 'SORT_PROJECTS':
      return {
        ...state,
        sortProjectsBy: action.payload,
      }

    default:
      return state
  }
}
