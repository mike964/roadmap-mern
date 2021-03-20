const asyncHandler = fn => ( req, res, next ) => {
  Promise
    .resolve( fn( req, res, next ) )
    .catch( next )
}

// This is to get rid of writing tyrcatch inside async awiat functions

// export default asyncHandler
export default asyncHandler