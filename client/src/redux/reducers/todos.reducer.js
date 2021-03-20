
const initState = {
  todos: [

  ]
}



// Reducer
export default ( state = initState, action ) => {
  switch ( action.type ) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [ ...state.todos, action.payload ]
      };
    case 'COMPLETE_TODO':
      return {
        ...state,
        todos: state.todos.map( ( todo ) =>
          todo._id === action.payload
            ? { ...todo, complete: !todo.complete }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter( ( todo ) => todo._id !== action.payload )
      };
    default:
      return state
  }
}