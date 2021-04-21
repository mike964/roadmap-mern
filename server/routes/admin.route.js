import express from 'express'
// import { createUser, getUsers } from '../controllers/user.cont'
import { getSteps } from '../controllers/step.cont.js'
// import userRouter from './users.route.js'
import { protect, restrictedTo } from '../controllers/auth.cont.js'
import Step from '../models/Step.js'
import Project from '../models/Project.js'
import User from '../models/User.js'

//=============================================================
const router = express.Router()

// Only user.role = admin can crud users
router.use(protect)
router.use(restrictedTo('admin'))
// All routes below will use the two middlewares above

router.route('/steps').get(getSteps)

// router.use( '/users', userRouter )

// * insertMany or Delete or Update multiple documents (only admin)
router.get('/multiple', function (req, res) {
  // req.params.action    => i: insertmany , d: deletemany: , u: updatemany
  // console.log(req.query.action)   // output : i,d, u
  const action = req.query.action

  let Qr = ''
  if (action === 'i') {
    //qr = insertManay()
  } else if (action === 'd') {
    // Step.deleteMany()
  } else if (action === 'u') {
    // * RENAME FIELDS
    // Project.updateMany(
    //   {},
    //   { $rename: { 'user': 'owner' } },
    //   { multi: true },
    //   function (err, blocks) {
    //     if (err) {
    //       throw err
    //     }
    //     console.log('done!')
    //   }
    // )
    Step.updateMany({}, { notes: [] }, { multi: true }, function (err, blocks) {
      if (err) {
        throw err
      }
      console.log('done!')
    })
  } else {
    res.send('No action')
  }

  res.send(action)
})

// router.route( '/:id' )
//   .delete( deleteUser )
//   .put( updateUser )

export default router
