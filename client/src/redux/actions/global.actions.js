import store from '../store'
const { dispatch } = store

const toggleHideNotes = (x) => {
  dispatch({
    type: 'TOGGLE_HIDE_NOTES',
    payload: x, // Boolean
  })
}

const toggleHidecompleted = (x) => {
  // toggle hide completed todos
  dispatch({
    type: 'TOGGLE_HIDE_COMPLETED',
    payload: x, // Boolean
  })
}

export { toggleHideNotes, toggleHidecompleted }

export const sortProjectsByDate = (arr) => {
  arr.sort((a, b) => {
    return a.updatedAt < b.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
  })
  arr.sort((a, b) => {
    return b.active - a.active
  })

  return arr
}

export const setProjectSearch = (x) => {
  // handle project search find input text change

  dispatch({
    type: 'SET_PROJECT_SEARCH',
    payload: x, // Boolean
  })
}
