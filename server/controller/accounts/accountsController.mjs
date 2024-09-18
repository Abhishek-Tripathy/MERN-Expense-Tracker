import { User } from "../../models/User.mjs"
import { Account } from "../../models/Account.mjs"

//create
export const createAccountCtrl = async(req, res) => {
   const {name, accountType, initialBalance, notes} = req.body
   try {
      //Check if logged in
      const userFound = await User.findById(req.user)

      if(!userFound) return res.status(401).json({status: false, message: "Unauthorized, Plesae Log in"})
      
      //Create Account
      const account = await Account.create({
         name,
         accountType,
         initialBalance, 
         notes,
         createdBy: req.user
      })

      //Push the Account into User accounts
      userFound.accounts.push(account._id)

      //Resave the account
      await userFound.save()

      res.status(201).json({status: true, message: account})
   } catch (error) {
      res.json(error)
   }
}


//get all accounts
export const getAllAccountsCtrl =  async(req, res) => {
   try {
      const accounts = await Account.find().populate('transactions')
      res.json(accounts)
   } catch (error) {
      console.error(error)
      res.json(error)
   }
}


//single
export const getAccountCtrl = async(req, res) => {
   try {
      //find id from params
      const {id} = req.params
      const account = await Account.findById(id).populate("transactions")
      res.status(200).json({status: true, data: account})
   } catch (error) {
      console.error(error)
      res.json(error)
   }
}


//delete account
export const deleteAccountCtrl = async(req, res) => {
   try {
      const {id} = req.params
      const account = await Account.findByIdAndDelete(id)
      res.status(200).json({status: true, message: "account deleted successfully"})
   } catch (error) {
      console.error(error)
      res.json("error during account deletion",error)
   }
}

//update 
export const updateAccountCtrl = async(req, res) => {
   try {
      const {id} = req.params
      const account = await Account.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
      res.status(200).json({status: true, message: "account updated successfully", data: account})
   } catch (error) {
      console.error("error during account updation",error)
      res.json(error)
   }
}
