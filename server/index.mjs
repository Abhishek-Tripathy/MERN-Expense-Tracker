import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { usersRoute } from './routes/user/usersRoute.mjs'
import { accountsRoute } from './routes/accounts/accountsRoute.mjs'
import { transactionRoute } from './routes/transactions/transactionRoutes.mjs'


dotenv.config()

const app = express()

// dbConnect()
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)
   .then(() => console.log("DB connection successful"))
   .catch((err) => console.error(`DB connection error --> ${err}`))


app.use(express.json())

//routes : user
app.use('/api/v1/users', usersRoute)

//accounts
app.use('/api/v1/accounts', accountsRoute)

//transaction route
app.use('/api/v1/transactions', transactionRoute)






const port = process.env.PORT || 8000

app.listen(port, console.log(`Server is running on port --> ${port}`))