import React from 'react'
import Form from './form'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard'

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>
  )
}

export default App