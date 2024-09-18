
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './component/context/AuthContext/AuthContext.jsx'
import AccountContextProvider from './component/context/AccountContext/AccountContext.jsx'
import { TransactionContextProvider } from './component/context/TransactionContext/TransactionsContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <AccountContextProvider>
      <TransactionContextProvider>
        <App />
      </TransactionContextProvider>
    </AccountContextProvider>
  </AuthContextProvider>,
)
