import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './component/Forms/Login'
import Home from './component/Home/Home'
import Register from './component/Forms/Register'
import Navbar from './component/Navbar/Navbar.jsx'
import AddTransaction from './component/Forms/AddTransaction.jsx'
import AccountDashboard from './component/Dashboard/AccountDashboard.jsx'
import AccountDetails from './component/Dashboard/AccountDetails.jsx'
import AddAccount from './component/Forms/AddAccount.jsx'
import UpdateTransaction from './component/Forms/UpdateTransaction.jsx'


function App() {
  

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-transaction/:id' element={<AddTransaction />} />
        <Route path='/dashboard' element={<AccountDashboard />} />
        <Route path='/account-details/:accountID' element={<AccountDetails />} />
        <Route path='/dashboard/accounts/create' element={<AddAccount />} />
        <Route path='/update-transaction/:id' element={<UpdateTransaction />} />
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
