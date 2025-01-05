import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';


const Usecomponent = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return !user.messowner?<Outlet/>:<Navigate to='/Alluser'/>
}

export default Usecomponent
