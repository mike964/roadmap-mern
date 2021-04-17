
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
// import users from './data/users.js'
// import products from './data/products.js' 
import connectDB from './config/db.js'
import User from './models/User.js';
import { users, projects } from './utils/_data.js';
import Project from './models/Project.js';
import Step from './models/Step.js'

dotenv.config()

// connectDB() 

const importData = async () => {
  try {
    // await Order.deleteMany()
    // await Product.deleteMany()
    // await User.deleteMany()

    // const createdUsers = await User.insertMany( users )

    // const adminUser = createdUsers[ 0 ]._id

    // const sampleProjects = products.map( ( product ) => {
    //   return { ...product, user: adminUser }
    // } )

    // await User.insertMany( users )
    await Project.insertMany( projects )
    // await Product.insertMany( steps )

    console.log( 'Data Imported!'.green.inverse )
    process.exit()
  } catch ( error ) {
    console.error( `${ error }`.red.inverse )
    process.exit( 1 )
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log( 'Data Destroyed!'.red.inverse )
    process.exit()
  } catch ( error ) {
    console.error( `${ error }`.red.inverse )
    process.exit( 1 )
  }
}

const updateData = async ()=>{
  // * Update multiple documents
  // Dosn't work properly. need fix
try {
  await Step.updateMany( {   }, { $rename: { 'nickname': 'alias', 'cell': 'mobile' } } )
} catch (error) {
  console.error( `${ error }`.red.inverse )
    process.exit( 1 )
}

}

 
if ( process.argv[ 2 ] === '-d' ) {
  destroyData()
} else if ( process.argv[ 2 ] === '-i' ) {
  importData() 
} else if ( process.argv[ 2 ] === '-u' ) {
  updateData() 
} else if ( process.argv[ 2 ] === '-t' ) {
  console.log('Test')
} else {
  // importData()
  console.log('No command!')
}


//==============
// *** HINTS ***
//==============
// db.students.update( { _id: 1 }, { $rename: { 'nickname': 'alias', 'cell': 'mobile' } } )
