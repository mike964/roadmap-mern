import * as crud from '../utils/crudHandler.js'
import User from '../models/User.js'

//============================================================
// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
const getUsers = crud.getAll( User )
const getUser = crud.getOne( User )
const createUser = crud.createOne( User )
const updateUser = crud.updateOne( User )
const deleteUser = crud.deleteOne( User )