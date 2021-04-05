import jwt from 'jsonwebtoken'
import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
// const sendEmail from '../utils/sendEmail.js' )
import User from '../models/User.js'

//=================================================================
// authentication and authorization *** احراز هویت کاربر و اجازه دادن
//================================================================

// ** Create & Send jwt token to Client when login/singup
const sendTokenResponse = ( user, statusCode, res ) => {
  // *** BRAD ***
  // const token = user.signJwtToken()
  // jwt.sign(payload: 'Data we wannsa store in the token' , jwt_secret, jwt_expire ) 
  const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE } )

  const cookie_options = {
    // set cookie expiration - same as token expiration 
    expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
    httpOnly: true
  }

  if ( process.env.NODE_ENV === 'production' ) {
    cookie_options.secure = true
  }

  // Remove password from output
  // user.password = undefined   

  const { name, email, balance, ide } = user
  let user_ = { name, email, balance, ide }

  if ( user.role === 'admin' )
    user_.isAdmin = true

  res
    .status( statusCode )  // statusCode: 200 
    .cookie( 'token', token, cookie_options )   // (cookie name - value - options)  
    .json( {
      success: true,
      token,   // so important
      user: user_   // {...user} shoud not be sent , only token 
    } )
}

// @desc      Register user
// @route     POST /api/auth/register
// @access    Public
const register = asyncHandler( async ( req, res, next ) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create( {
    name,
    email,
    password,
    // role,
  } );

  // grab token and send to email
  // const confirmEmailToken = user.generateEmailConfirmToken();

  // Create reset url
  // const confirmEmailURL = `${ req.protocol }://${ req.get(
  //   'host',
  // ) }/api/auth/confirmemail?token=${ confirmEmailToken }`;

  // const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${ confirmEmailURL }`;

  user.save( { validateBeforeSave: false } );

  // const sendResult = await sendEmail( {
  //   email: user.email,
  //   subject: 'Email confirmation token',
  //   message,
  // } );

  sendTokenResponse( user, 200, res );
} );

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
const login = asyncHandler( async ( req, res, next ) => {
  const { email, password } = req.body;

  // Validate emil & password
  if ( !email || !password ) {
    return next( new ErrorResponse( 'Please provide an email and password', 400 ) );
  }

  // Check for user
  const user = await User.findOne( { email } ).select( '+password' );

  if ( !user ) {
    return next( new ErrorResponse( 'Invalid credentials', 401 ) );
  }

  // Check if password matches
  const isMatch = await user.matchPassword( password );

  if ( !isMatch ) {
    return next( new ErrorResponse( 'Invalid credentials', 401 ) );
  }

  sendTokenResponse( user, 200, res );
} );

// @desc      Log user out / clear cookie
// @route     GET /api/auth/logout
// @access    Private
const logout = asyncHandler( async ( req, res, next ) => {
  console.log( '--- logout() :auth.cont ---' )
  //  *** Delete jwt token
  res.cookie( 'token', '', {
    // expires in 10 scnds
    expires: new Date( Date.now() + 10 * 1000 ),
    httpOnly: true
  } )

  req.logout()
  res.redirect( CLIENT_HOMEPAGE )  // *** Importante

  // res.status( 200 ).json( {
  //   success: true,
  //   //data: {}
  // } )
} )

// @desc      Get current logged in user info
// @route     POST /api/auth/me
// @access    Private
const getMe = asyncHandler( async ( req, res, next ) => {
  console.log( '--- getMe() ---' )
  // *** req.user.id comes from protect mdlwr 
  // const user = await User.findById( req.user.id ).select( '-password' )   // works
  // const user = await User.findById( req.user.id ).select( '-_id' )          // works 
  // const user = await User.findById( req.user.id ).select( '-password, -_id', )   // works
  const user = await User.findById( req.user.id )  // works - this also returns the user _id

  // For security: To prevent returning user._id & password
  const { name, email, balance, ide } = user
  // *** In order to prevent returning user._id
  let user_ = { name, email, balance, ide }

  if ( user.role === 'admin' ) { }
  // check to see _id should be send or not

  // If logged in user is Admin 
  res.status( 200 ).json( {
    success: true,
    // user: user.role === 'admin' ? { ...user_, isAdmin: true } : user_  // Works fine
    user: user_  // Works fine
  } )
} )


// @desc      Update user details
// @route     PUT /api/auth/updatedetails
// @access    Private
const updateDetails = asyncHandler( async ( req, res, next ) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate( req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  } );

  res.status( 200 ).json( {
    success: true,
    data: user,
  } );
} );


// *** Auth Middleware ***//
//=======================//
// *** Protect routes - private routes
const protect = asyncHandler( async ( req, res, next ) => {

  console.log( '--- protect() mdlwr ran ...'.yellow )
  let token

  // console.log( req.cookies )

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith( 'Bearer' )
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split( ' ' )[ 1 ];
    console.log( 'token comes from req.headers.authorization' )
    // Set token from cookie
  } else if ( req.cookies.token ) {
    // Always can load token with every request from cookie - req.cookies is set when user login
    token = req.cookies.token
    console.log( 'token comes from req.cookies' )

    // } else if ( !token ) {
  } else {
    // Make sure token exists
    return next( new ErrorResponse( 'No Token!', 401 ) )
  }

  // console.log( token )   // output: Bearer 5ee0e50fa350c44dd0daa385

  // Verify token if exist  {userid , issuedat, expiration}
  // const decoded = jwt.verify( token, process.env.JWT_SECRET )

  // console.log( decoded )   // output: { id: '5edbf8e44ae9a940185278d9', iat: 1591521162, exp: 1594113162 }

  // console.log( req.user )
  // Verify token if exist  {userid , issuedat, expiration}
  const decodedToken = jwt.verify( token, process.env.JWT_SECRET )

  // console.log( decodedToken )   // output: { id: '5edbf8e44ae9a940185278d9', iat: 1591521162, exp: 1594113162 }
  // console.log( 'Token: ' + token )

  let user = await User.findById( decodedToken.id )
  // req.user = await User.findById( token )
  // console.log( user )

  if ( !user ) {
    return next( new ErrorResponse( 'User not found!', 401 ) )
  }
  // ELSE - SET USER
  req.user = user
  // req.body.user = user._id
  // req.query.user = user._id

  next()
} )


// Grant access to specific user roles - this is same as restrictedTo in Jonas project 
const restrictedTo = ( ...roles ) => {  // (publisher, admin, ..) will get passed in
  return ( req, res, next ) => {
    if ( !roles.includes( req.user.role ) ) {
      return next(
        new ErrorResponse( `User ${ req.user.id } is not authorized to access this route`, 403 )
      )
    }

    next()
  }
}


export { register, login, logout, getMe, updateDetails, protect, restrictedTo }