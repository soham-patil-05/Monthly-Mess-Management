import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Messownercomponent = () => {
  const auth = JSON.parse(localStorage.getItem("user"))
  return auth.messowner?<Outlet/>:<Navigate to='/signup'/>
}

export default Messownercomponent
