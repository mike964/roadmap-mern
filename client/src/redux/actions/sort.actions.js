import store from '../store'
const { dispatch, getState } = store


export const sortBy = ( x ) => {

  switch ( x ) {
    case 'sequence':
      dispatch( { type: 'SORT_BY_SQUNCE' } )
      break
    case 'name':
      dispatch( { type: 'SORT_BY_NAME' } )
      break
    case 'finishedAt':
      dispatch( { type: 'SORT_BY_FINISHED_AT' } )
      break

    default: x = 'none'
  }
}