import { Account } from "../../models/Account.mjs"
import { Transaction } from "../../models/Transactions.mjs"
import { User } from "../../models/User.mjs"



//create
export const createTransactionsCtrl = async(req, res) => {
   const {name, amount, notes, transactionType, account, category} = req.body
   try {
      //Find user
      const userFound = await User.findById(req.user)
      if(!userFound) return res.status(404).json({status: false, message: "No user found"})

      //Find account
      const accountFound = await Account.findById(account)
      if(!accountFound) return res.status(404).json({status: false, message: "Account not found"})

      //create transaction
      const transaction = await Transaction.create({
         amount, notes, account, transactionType, category, name, createdBy: req.user
      })

      //push transactions to the account
      accountFound.transactions.push(transaction._id)

      //resave the account
      await accountFound.save()

      res.status(201).json({status: true, message: transaction})
   } catch (error) {
      console.error("Error at transaction Creattion" , error)
      res.json(error)
   }
}

//get all transactions
export const allTransactionsCtrl = async(req, res) => {
   try {
      const transactions = await Transaction.find()
      res.status(200).json({status: true, message: transactions})
   } catch (error) {
      console.error(error)
      res.json(error)
   }
}

//get Single Transactions 
export const singleTransactionCtrl = async(req, res) => {
   try {
      const {id} = req.params
      const transaction = await Transaction.findById(id)
      res.status(200).json({status: true, message: transaction})
      } catch (error) {
      console.error(error)
      res.json(error)
   }
}

// delete
export const deleteTransaction =  async(req, res) => {
   try {
      const {id} = req.params
      await Transaction.findByIdAndDelete(id)
      res.status(200).json({status: true, message: "Transaction deleted successfully"})
   } catch (error) {
      console.error(error)
      res.json(error)
   }
}

//update
export const updateTransaction = async(req, res) => {
   try {
      const {id} = req.params
      const transaction = await Transaction.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
      res.status(200).json({status: true, message: transaction})
   } catch (error) {
      console.error(error)
      res.json(error)
   }
}