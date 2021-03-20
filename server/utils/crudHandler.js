import qrFunc from './queryFunction.js'
// import catchAsync from './catchAsync' )
// import AppError from './appError' )
// import APIFeatures from './apiFeatures' )
import ErrorResponse from './errorResponse.js'

// We run this to prevent writing trycatch in every asyn function
const catchAsync = fn => {
  return ( req, res, next ) => {
    fn( req, res, next ).catch( next )
  }
}

// lsn 11.17
const getOne = ( Model, populateOptions ) =>
  catchAsync( async ( req, res, next ) => {

    let query = Model.findById( req.params.id )

    if ( populateOptions ) {
      if ( typeof populateOptions === 'object' ) {
        query = query.populate( ...populateOptions )
      } else {
        query = query.populate( populateOptions )
      }
    }

    const doc = await query

    if ( !doc ) {
      return next( new ErrorResponse( 'No document found with that ID', 404 ) )
    }

    res.status( 200 ).json( {
      success: true,
      nResults: 1,
      data: doc
    } )
  } )


const getAll = ( Model, populateOptions ) =>
  catchAsync( async ( req, res, next ) => {

    // console.log( req.query )

    // lsn 11.21
    // const docs = await features.qr
    // const doc = await features.qr.explain()   // this is for motherfukers 😎

    // Execute query - find bootcamps in db
    const qr = qrFunc( req.query, Model, populateOptions )

    // qr.select( '-__v' )   // remove __v from response
    const docs = await qr


    // SEND RESPONSE 

    res.status( 200 ).json( {
      success: true,
      nResults: docs.length,
      docs
    } )
  } )


// lsn 11.15
const deleteOne = Model => catchAsync( async ( req, res, next ) => {

  const doc = await Model.findById( req.params.id )

  if ( !doc ) {
    return next( new ErrorResponse( `No doc with the id of ${ req.params.id }` ), 404 )
  }

  const documentId = req.params.id

  doc.remove()

  res.status( 200 ).json( {
    success: true,
    data: null,
    msg: `Doc ${ documentId } deleted!`
  } )
} )

const updateOne = Model =>  // Fix needed later
  catchAsync( async ( req, res, next ) => {
    const doc = await Model.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
      runValidators: true
    } )

    if ( !doc ) {
      return next( new ErrorResponse( `No doc found with id of ${ req.params.id }`, 404 ) )
    }

    res.status( 200 ).json( {
      success: true,
      msg: `${ req.params.id } updated!`,
      data: doc
    } )
  } )

const createOne = Model => catchAsync( async ( req, res, next ) => {

  // const docs = await Model.find()

  // reqBody = {
  //   sequence: docs.length + 1,
  //   ...req.body
  // }

  const doc = await Model.create( req.body )

  res.status( 201 ).json( {
    success: true,
    data: doc,
    // docs
  } )
} )





export { getOne, getAll, deleteOne, updateOne, createOne }