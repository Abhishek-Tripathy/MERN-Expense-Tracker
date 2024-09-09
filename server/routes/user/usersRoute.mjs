import express from 'express'
import { deleteUserCtrl, loginUserCtrl, profileUserCtrl, registerUserCtrl, updateUserCtrl } from '../../controller/users/usersController.mjs'
import { isLoggedIn } from '../../middleware/isLoggedIn.mjs'

const usersRoute = express.Router()

usersRoute.post('/register', registerUserCtrl)

usersRoute.post('/login', loginUserCtrl)

usersRoute.get('/profile/', isLoggedIn, profileUserCtrl)

usersRoute.delete('/', isLoggedIn, deleteUserCtrl)

usersRoute.put('/', isLoggedIn, updateUserCtrl)

export {usersRoute} 