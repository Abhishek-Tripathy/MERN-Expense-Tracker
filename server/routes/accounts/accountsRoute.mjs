import express from 'express'
import { createAccountCtrl, deleteAccountCtrl, getAccountCtrl, getAllAccountsCtrl, updateAccountCtrl } from '../../controller/accounts/accountsController.mjs'
import { isLoggedIn } from '../../middleware/isLoggedIn.mjs'

const accountsRoute = express.Router()

accountsRoute.post('/', isLoggedIn, createAccountCtrl)

accountsRoute.get('/', getAllAccountsCtrl)

accountsRoute.get('/:id', getAccountCtrl)

accountsRoute.delete('/:id', deleteAccountCtrl)

accountsRoute.put('/:id', updateAccountCtrl)



export {accountsRoute}
