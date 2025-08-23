import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate

} from "react-router-dom"
import Login from './pages/Auth/Login.jsx'
import SignUp from './pages/Auth/SignUp.jsx'
import Home from './pages/Dashboard/Home.jsx'
import Income from './pages/Dashboard/Income.jsx'
import Expense from './pages/Dashboard/Expense.jsx'
import UserProvider from './context/userContext.jsx'
import { Toaster} from "react-hot-toast"

const App = () => {
  return (
    <UserProvider>

    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' exact  element={<Login />} />
          <Route path='/signUp' exact  element={<SignUp />} />
          <Route path='/dashboard' exact  element={<Home />} />
          <Route path='/income' exact  element={<Income />} />
          <Route path='/expense' exact  element={<Expense />} />
        </Routes>
      </Router>
    </div>

    <Toaster 
    toastOptions={{
      className:"",
      style: {
        fontSize:'13px'
      },
    }}
    />
    </UserProvider>
  )
}

export default App


const Root = () => {
  const isAuthenicated = !!localStorage.getItem("token")

  return isAuthenicated ? (
    <Navigate to={"/dashboard"} />
  ) : <Navigate to={"/login"} />
}