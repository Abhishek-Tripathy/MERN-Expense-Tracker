import express from 'express'
import { createTransactionsCtrl, allTransactionsCtrl, singleTransactionCtrl, deleteTransaction, updateTransaction } from '../../controller/transactions/transactionsController.mjs'
import { isLoggedIn } from '../../middleware/isLoggedIn.mjs'


const transactionRoute = express.Router()

transactionRoute.post('/', isLoggedIn, createTransactionsCtrl)

transactionRoute.get('/', allTransactionsCtrl)

transactionRoute.get('/:id', singleTransactionCtrl)

transactionRoute.delete('/:id', deleteTransaction)

transactionRoute.put('/:id', updateTransaction)


export {transactionRoute} 

