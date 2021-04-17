import mongoose from 'mongoose'
import slugify from 'slugify'
const Schema = mongoose.Schema

// Create Schema
const projectSchema = new Schema(
  {
    user: {
      // owner
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Project must belong to a user'],
    },
    // users: []    // contributers
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      // project-name for url
      type: String,
      unique: true,
    },
    description: {
      // one line
      type: String,
      required: true,
    },
    active: {
      // project is under work at present
      type: Boolean,
      default: false,
    },
    goals: {
      // * split by /   ex. help users to ...
      type: String,
      default: null,
    },
    features: {
      // main - ideas - features * split by /   ex. Show ...
      type: String,
      default: null,
    },
    notes: {
      // next line by <br>  // for ex : clone example.com
      type: String,
      default: null,
    },
    startedAt: {
      // If (started) , means started = true
      type: Date,
      default: null,
    },
    finishedAt: {
      // If finishedAt exist , means finished = true
      type: Date,
      default: null,
    },
    createdAt: { type: Date, default: Date.now },
    // features
    // main idea
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  },
)

// Create bootcamp slug from the name
projectSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

const Project = mongoose.model('Project', projectSchema)
// export default Project
export default Project
