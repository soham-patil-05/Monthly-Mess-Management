import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';

const Pink = () => {
    const user = localStorage.getItem('user');
    return !user?<Outlet/>:<Navigate to='/'/>
}

export default Pink
