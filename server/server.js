// import dotenv from 'dotenv'
import dotenv from 'dotenv/config.js'
import path from 'path'
import express from 'express'
import colors from 'colors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import compression from 'compression' 
import connectDB from './config/db.js';
import { logger } from './middleware/logger.mdlwr.js';
import authRouter from './routes/auth.route.js'
import Routers from './routes.js'
//===================================================================== 
// ** loads environment variables
// dotenv.config()
// ** Connect to DB

connectDB()


const app = express()

// ** set up cors to allow server to accept requests from client
app.use(
  cors( {
    // allow to server to accept request from different origin
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  } )
);



// *** Using Middlewares *** 
// Request Body Parser
app.use( express.json() )
// Cookie parser
app.use( cookieParser() )
app.use( logger )
// app.use( errorHandler )
// app.use( compression )

// Hi Guys :)

// app.use( '/', ( req, res ) => 
//   res.send( `Hi Bitch! You made ${ req.method } request to '${ req.originalUrl }' ` ) 
// } )

const __dirname = path.resolve();

// *** Passport js routes ( Google / Facebook )
app.get( '/test', ( req, res ) => res.send( "Testing server ..." ) )

// app.use( '/auth', require( './routes/auth.route' ) )
app.use( '/auth', authRouter )
// *** Mount API Routers ***  ) ) 
// app.use( '/api', require( './routes' ) )
app.use( '/api', Routers )

// *** Set public as static files folder  
app.use( '/api', express.static( path.join( __dirname, 'public' ) ) )
// http://localhost:3500/some-picture.jpg
// http://localhost:3500/api/some-picture.jpg 

// app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )   // FOR TEST

if ( process.env.NODE_ENV === 'production' ) {
  // ** When we deploy to the server - Run React js client as static folder
  app.use( express.static( path.join( __dirname, '/client/build' ) ) )
  app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) )
} else {      //  if NODE_ENV == development
  app.get( '/', ( req, res ) => res.send( "Hello from '/'. NODE_ENV == development" ) )
}


const port = process.env.PORT || 5000

app.listen( port, () => {
  console.log( `Server running on PORT: ${ port }`.green )
  console.log( "NODE_ENV: " + process.env.NODE_ENV )
  // let clientUrl = getClientUrl()
  // console.log( "CLIENT URL : " + clientUrl )
} )