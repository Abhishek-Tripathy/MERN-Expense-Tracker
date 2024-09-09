import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
   return jwt.sign({id}, 'anykey', {expiresIn: "30d"})
}