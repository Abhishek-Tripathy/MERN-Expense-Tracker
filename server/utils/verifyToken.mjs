import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
   return jwt.verify(token, "anykey", (err, decoded) => {
      if(err) {
         return false
      }else{
         return decoded
      }
   })
}