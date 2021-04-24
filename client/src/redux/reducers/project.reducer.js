const initState = {
  projects: [],
  currentProject: {},
  loading: true,
}

// Reducer
export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_LOADING':
      return {
        ...state,
        loading: action.payload, // boolean
      }
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        loading: false,
      }
    case 'SET_CURRENT_PROJECT':
      // * Current open project
      return {
        ...state,
        currentProject: action.payload,
        loading: false,
      }
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      }
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((proj) => proj._id !== action.id),
      }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((proj) =>
          proj._id === action.id ? (proj = action.project) : proj
        ),
      }
    case 'CLEAR_PROJECTS':
      return {
        projects: [],
        currentProject: {},
      }
    case 'SORT_PROJECTS':
      return {
        ...state,
        projects: sortProjectsByName(state.projects),
      }
    case 'COMPLETE_':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload
            ? { ...todo, complete: !todo.complete }
            : todo
        ),
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      }
    default:
      return state
  }
}

const sortProjectsByName = (arr) => {
  arr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
  console.log(arr)
  return arr
}
