
const sortReducer = ( state = '', action ) => {
  switch ( action.type ) {

    // case 'SORT_BY_DATE':
    //   return 'date'

    case 'SORT_BY_INDEX':
      return 'index'
    case 'SORT_BY_SQUNCE':
      return 'sequence'
    case 'SORT_BY_NAME':
      return 'name'

    case 'CLEAR_SORT':
      return ''

    default:
      return state
  }
}

export default sortReducer