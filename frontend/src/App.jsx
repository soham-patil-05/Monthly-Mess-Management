// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Wallet from './pages/Wallet/Wallet.jsx';
import Messdes from './pages/Messdes/Messdes.jsx';
import Signup from './components/Loginsign/Signup.jsx';
import Loginsign from './components/Loginsign/Loginsign.jsx';
import Privatecomponent from './Privatecomponent.jsx';
import Logout from './Logout.jsx';
import Footer from './components/Footer/Footer.jsx';
import Messpopup from './components/Messpopup/Messpopup.jsx';
import Messownercomponent from './Messownercomponent.jsx';
import Alluser from './pages/Allusers/Alluser.jsx';
import Updater from './pages/Updater/Updater.jsx';
import Usecomponent from './Usecomponent.jsx';
import Pink from './Pink.jsx';



const App = () => {
  const [showmessdetail, setShowmessdetail] = useState({
    isopen : false,
    messdetails : null
  });
  return (
    <div className='app'>
      {showmessdetail.isopen && <Messpopup showmessdetail={showmessdetail} setShowmessdetail={setShowmessdetail}/>}
      <Navbar />
      <Routes>
        <Route element={<Privatecomponent/>}>
          <Route element={<Messownercomponent/>}>
            <Route path='/Alluser' element = {<Alluser/>}/>
            <Route path='/Updater' element = {<Updater/>}/>
            
            <Route path='/Messdes' element={<Messdes />} />
           
           
          </Route>
          <Route element={<Usecomponent />}>
          <Route path='/' element={<Home setShowmessdetail={setShowmessdetail} />} />
          <Route path='/Wallet' element={<Wallet />} />
          
          
          </Route>
          
          
         
        </Route>
        <Route element = {<Pink/>}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Loginsign />} />
        </Route>
      </Routes>
      <Footer />
      
    </div>
  );
};

export default App;
