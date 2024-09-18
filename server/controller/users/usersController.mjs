import { User } from "../../models/User.mjs"
import bcrypt from 'bcryptjs'
import { generateToken } from "../../utils/generateToken.mjs"


//register
export const registerUserCtrl = async(req, res, next) => {
   const {fullname, password, email} = req.body
   try {
   // check if email exists
      const userFound = await User.findOne({email})
      if(userFound) res.status(400).json({message: "Email already exists", status: false} )

   // check if all fields provided
      if(!password || !fullname || !email) return res
      .status(400)
      .json({status: false, message: "Fill the necessary fields"})

   // hash the password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

   // Create user
      const user = await User.create({
         fullname,
         email,
         password: hashedPassword,
      })

      res.status(200).json({status: true, fullname: user.fullname, id: user._id, email: user.email})
   } catch (error) {
      console.error(error)
      
   }
}


//login
export const loginUserCtrl = async(req, res) => {
   const {email, password} = req.body
   try {
   // Chech if email exists
      const userFound = await User.findOne({email})
      if(!userFound) return res.status(400).json({status: false, message: "Invalid login credentials"})

   // Check if Password exists
      const isPAsswordMatched = await bcrypt.compare(password, userFound.password)
      if(!isPAsswordMatched) return res.status(400).json({status: false, message: "Invalid login credentials"})


      res.status(200).json({status: true , 
         fullname: userFound.fullname, 
         id: userFound._id, 
         token: generateToken(userFound._id),
      })
   } catch (error) {
      console.error(error)
      res.json(error)
   }
}


//profile
export const profileUserCtrl = async(req, res) => {
   try {
      const user = await User.findById(req.user).populate({
         path: 'accounts',
         populate: {
            path: 'transactions',
            model: 'Transaction',
         }
      })
      
      res.json(user)
   } catch (error) {
      console.error("error at user profile" ,error)
      res.json(error)
   }
}

//delete
export const deleteUserCtrl = async(req, res) => {
   try {
      await User.findByIdAndDelete(req.user)
      res.status(200).json({status: true, message: "User deleted successfully"})
   } catch (error) {
      console.error( "Error while deleting a user", error)
      res.json(error)
   }
}

//update
export const updateUserCtrl = async(req, res) => {
   try {
      //Update Email: 1:- Check if email already exists
      if(req.body.email){
         const userFound = await User.findOne({email: req.body.email})
         if(userFound) return res.status(401).json({status: false, message: "User already exists"})
      }
      
      //Check is user is updating password
      if(req.body.password) {
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(req.body.password, salt)
         //update the user
         const user = await User.findByIdAndUpdate(req.user, {password: hashedPassword}, {new: true, runValidators: true})
         //send res
         return res.status(200).json({status: true, message: "Password updated successfully"})
      }

      //check if user not updating password, but other properties
      const user = await User.findByIdAndUpdate(req.user, req.body, {new: true, runValidators: true})

      res.status(200).json({status: true, message: user})

      
   } catch (error) {
      console.error("Error while updating",  error)
      res.json(error)
   }
}
