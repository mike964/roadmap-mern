import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Create Schema
const stepSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project',
      required: [true, 'Step must belong to a project'],
    },
    note: {
      // write your feeling after compliting step
      type: String,
      default: null,
    },
    completed: {
      //
      type: Boolean,
      default: false,
    },
    completedAt: {
      // completed at (date)
      type: Date,
    },
    index: {
      type: Number,
      default: 0,
    },
    // groups : [backend ,frontend ,...]
    // keywords: [x, y, ..]
    type: {
      // type : [todo , note ]
      type: String,
      default: 'todo',
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    // timestamps: true  // createdAt, updatedAt
    timestamps: { createdAt: false, updatedAt: true },
  },
)

const Step = mongoose.model('Step', stepSchema)
export default Step

// project = required
