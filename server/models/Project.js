import mongoose from 'mongoose'
const Schema = mongoose.Schema


// Create Schema
const projectSchema = new Schema( {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [ true, 'Project must belong to a user' ]
  },
  name: {
    type: String,
    required: true
  },
  description: {  // one line
    type: String,
    required: true
  },
  goals: {   // * split by /   ex. help users to ...
    type: String,
    default: null
  },
  features: {   // main - ideas - features * split by /   ex. Show ...
    type: String,
    default: null
  },
  notes: {   // next line by <br>  // for ex : clone example.com
    type: String,
    default: null
  },
  startedAt: {   // If (started) , means started = true
    type: Date,
    default: null
  },
  finishedAt: {  // If finishedAt exist , means finished = true
    type: Date,
    default: null
  },
  createdAt: { type: Date, default: Date.now }
  // features
  // main idea
},
  {
    timestamps: { createdAt: false, updatedAt: true }
  } )

const Project = mongoose.model( 'Project', projectSchema )
// export default Project
export default Project
