import React from 'react'
import Form from './form'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard'
import Login from './login'
import ForgotPassword from './forgotPassword'
import Verify from './verify'

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}

export default App