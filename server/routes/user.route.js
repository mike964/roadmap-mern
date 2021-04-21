import express from 'express'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.cont.js'

const router = express.Router()

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

export default router
