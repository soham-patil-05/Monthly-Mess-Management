import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.jpeg';

const Navbar = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(auth ? '/home' : '/login');
  
  const handleItemClick = (path) => {
    setActiveItem(path); // Update active menu item
    navigate(path); // Navigate to the clicked path
  };

  const logout = ()=>{
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className='navbar'>
      <img src={logo} alt="" className="logo" />
      <ul className='navbar_menu'>
        {auth?
          (auth.messowner ? (
            <>
              <li className={activeItem === '/Alluser' ? 'active' : ''} onClick={() => handleItemClick('/Alluser')}>Users</li>
              <li className={activeItem === '/contact-us' ? 'active' : ''} onClick={() => handleItemClick('/contact-us')}>Contact-Us</li>
              <li className={activeItem === '/Updater' ? 'active' : ''} onClick={() => handleItemClick('/Updater')}>Update data</li>
              <li className={activeItem === '/logout' ? 'active' : ''} onClick={()=>logout()}>Logout({auth.username})</li>
            </>
          ) : (
            <>
              <li className={activeItem === '/' ? 'active' : ''} onClick={() => handleItemClick('/')}>Home</li> 
              <li className={activeItem === '/wallet' ? 'active' : ''} onClick={() => handleItemClick('/wallet')}>Wallet</li>
              <li className={activeItem === '/contact-us' ? 'active' : ''} onClick={() => handleItemClick('/contact-us')}>Contact-Us</li>
              <li className={activeItem === '/logout' ? 'active' : ''} onClick={()=>logout()}>Logout({auth.username})</li>
            </>
          ))
         : (
          <>
            <li className={activeItem === '/signup' ? 'active' : ''} onClick={() => handleItemClick('/signup')}>Sign-up</li>
            <li className={activeItem === '/login' ? 'active' : ''} onClick={() => handleItemClick('/login')}>Login</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
