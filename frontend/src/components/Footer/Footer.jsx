import React from 'react'
import './Footer.css'
import insta from '../../assets/insta.jpeg';
import facebook from '../../assets/facebook.jpeg';
import linkdin from '../../assets/linkdin.jpeg';
import logo from '../../assets/logo.jpeg';


const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={logo} alt="" />
                <p>M3 is your go-to resource for mess information near PICT. Created by PICT students Tejas, Soham, Gauri, Shweta, and Geetanjali, we simplify dining with details on messes' hours, reviews, and locations. Our innovative credit system makes dining hassle-free. Have questions? Contact us for more information!
                </p>
                <div className="social-icons">
                    <img src={insta} alt="" /><img src={linkdin} alt="" /><img src={facebook} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY M3</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Privacy</li>    
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 23456 23465</li>
                    <li>pict2378@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright" style={{textAlign: 'center'}}>Copyright@2024 MMM.com - All Rights Reserved</p>

      
    </div>
  )
}

export default Footer
