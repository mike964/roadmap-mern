import mongoose from 'mongoose'

// const mongoURI = process.env.MONGO_URI
// const mongoURI = "mongodb://localhost/moslm-roadmap"

let local_db = false   // whether connect to local db or atlas db
let mongoURI
let connectionMsg

// console.log( "Atlas URI: " + process.env.ATLAS_URI )

if ( local_db ) {
  mongoURI = "mongodb://localhost:27017/moslm-roadmap"
  connectionMsg = "Local DB connected ..."
} else {
  // mongoURI = "mongodb+srv://mike:mike1234@cluster0-gpzsv.mongodb.net/roadmap-db?retryWrites=true&w=majority"
  mongoURI = process.env.ATLAS_URI
  connectionMsg = "ATLAS DB connected ..."
}




const connectDB = async () => {
  try {
    const conn = await mongoose.connect( mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    } )

    // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    console.log( connectionMsg )
  } catch ( error ) {
    console.error( `Error: ${ error.message }`.red.underline.bold )
    process.exit( 1 )
  }
}



// export default connectDB
export default connectDB