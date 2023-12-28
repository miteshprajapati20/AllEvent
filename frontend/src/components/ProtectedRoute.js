import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

  return (
        !localStorage.getItem('token')? <Navigate to="/login"/> : <Outlet/>
  )
}

export default ProtectedRoute