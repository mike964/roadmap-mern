const initState = {
  steps: [],
  loading: true
}


export default ( state = initState, action ) => {
  switch ( action.type ) {

    case 'SET_STEP_LOADING':
      return {
        ...state,
        loading: action.payload   // Boolean
      }

    case 'SET_STEPS':
      return {
        ...state,
        steps: action.payload,
        loading: false
      }

    case 'ADD_STEP':
      return {
        ...state,
        steps: [ ...state.steps, action.payload ]
      }

    case 'UPDATE_STEP':
      return {
        ...state,
        steps: state.steps.map( stp =>
          stp._id === action.payload._id ? stp = action.payload : stp
        )
      }

    case 'DELETE_STEP':
      return {
        ...state,
        steps: state.steps.filter( stp => stp._id !== action.payload )
      }

    // case 'SORT_BY_INDEX':
    // return {
    //   ...state,
    //   todos: state.todos.sort( compare_sequence )
    // }

    case 'SORT_BY_SQUNCE':
      return {
        ...state,
        steps: state.steps.sort( compare_sequence )
      }
    case 'SORT_BY_NAME':
      return {
        ...state,
        steps: state.steps.sort( compare_name )
      }
    case 'SORT_BY_FINISHED_AT':
      return {
        ...state,
        steps: state.steps.sort( compare_finishedAt )
      }

    case 'CHANGE_SQUNCE':
      return {
        ...state,
        steps: state.steps.map( ( stp ) => {
          if ( stp.sequence === action.stepSequence ) {
            return {
              ...stp,
              sequence: stp.sequence + ( action.diff )
            }
          } else if ( stp.sequence === action.stepSequence + action.diff ) {
            return {
              ...stp,
              sequence: stp.sequence - ( action.diff )
            }
          } else {
            return stp
          }
        } )
      };

    default:
      return state
  }
}



function compare_sequence ( a, b ) {
  // a should come before b in the sorted order
  if ( a.sequence && !b.sequence ) {
    return -1
  } else if ( a.sequence < b.sequence ) {
    return -1;
    // a should come after b in the sorted order
  } else if ( a.sequence > b.sequence ) {
    return 1;
    // a and b are the same
  } else {
    return 0
  }
}
function compare_finishedAt ( a, b ) {
  // a should come before b in the sorted order
  if ( a.finishedAt && !b.finishedAt ) {
    return -1
  } else if ( a.finishedAt < b.finishedAt ) {
    return -1;
    // a should come after b in the sorted order
  } else if ( a.finishedAt > b.finishedAt ) {
    return 1
    // a and b are the same
  } else {
    return 0
  }
}

function compare_name ( a, b ) {
  var x = a.name.toLowerCase();
  var y = b.name.toLowerCase();
  // a should come before b in the sorted order
  if ( x < y ) { return -1; }
  if ( x > y ) { return 1; }
  return 0;
}