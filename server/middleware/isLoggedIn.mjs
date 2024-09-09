import { getTokenFromHeader } from "../utils/getTokenFromHeader.mjs"
import { verifyToken } from "../utils/verifyToken.mjs"

export const isLoggedIn = (req, res, next) => {
   //get token from req header 
   const token = getTokenFromHeader(req)
   //verify user
   const decodedUser = verifyToken(token)
   //save the user into req obj
   req.user = decodedUser.id

   if(!decodedUser) return res.json({status: false, message: "Token expired, Login again"})

   next()
}