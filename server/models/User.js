import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema

// Create Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      // like twitter
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email!'],
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'publisher', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please add a password!'],
      minlength: 4,
      // select: false
    },
  },
  {
    timestamps: true,
  }
)

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  // return jwt.sign(
  //   { id: this._id },
  //   process.env.JWT_SECRET,
  //   { expiresIn: process.env.JWT_EXPIRE }
  //   )

  return this._id
}

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  // return true or false
  // return await bcrypt.compare( enteredPassword, this.password )
  return enteredPassword === this.password
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// ** Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Match user entered password to hashed password in database
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

// Generate email confirm token
// userSchema.methods.generateEmailConfirmToken = function ( next ) {
//   // email confirmation token
//   const confirmationToken = crypto.randomBytes( 20 ).toString( 'hex' );

//   this.confirmEmailToken = crypto
//     .createHash( 'sha256' )
//     .update( confirmationToken )
//     .digest( 'hex' );

//   const confirmTokenExtend = crypto.randomBytes( 100 ).toString( 'hex' );
//   const confirmTokenCombined = `${ confirmationToken }.${ confirmTokenExtend }`;
//   return confirmTokenCombined;
// };

// export default mongoose.model( 'User', userSchema )
const User = mongoose.model('User', userSchema)
export default User
