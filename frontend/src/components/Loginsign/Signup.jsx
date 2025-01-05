import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import './Loginsign.css';

const Signup = () => {
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messowner,setMessowner] = useState(null);

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if(messowner === null){
      alert("Please Choose your identity")
      return;
    }
    const data = {
      username,
      password,
      messowner
    };
    const localdata = JSON.stringify(data)
    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:3000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Account created successfully");
        localStorage.setItem('user', localdata);
        if(messowner){
          navigate('/Messdes');
        }else{
          navigate('/')
        }
      } else {
        alert("Error: Please Enter correct data");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error: Account could not be created");
    }
    
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Welcome to m3</h2>
        <div className="box2">

        <img className="onion" width="70px" src={image1} alt="Onion" />
        <img className="thali" width="70px" src={img3} alt="Thali" />
        
          <form className="Email">
            
            <label htmlFor="email">Username:</label>
            <input type="email" placeholder='Enter min 4 char' value={username} onChange={(e) => setUsername(e.target.value)} />
           
          </form>
          <form className="Pass">
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder='Enter min 4 char' value={password} onChange={(e) => setPassword(e.target.value)} />
          </form>
          <button className="sign" onClick={handleSubmit}>Create Account</button>
          <h3><Link to="/login">Have Account?.....Login</Link></h3>

          <img className="gulab" src={image2} width="70px" alt="Gulab" />
          <img className="pav" src={img4} width="75px" alt="Pav" />

        </div>
        <div class="radio-container">
  <label class="radio-label">
    <h3>Are you a mess owner?</h3>
  </label>
  <label class="radio-label">
    <input type="radio" name="owner" value="yes" onChange={()=>{setMessowner(true)}}/>
    <span class="radio-custom"></span>
    Yes
  </label>
  <label class="radio-label">
    <input type="radio" name="owner" value="no" onChange={()=>setMessowner(false)}/>
    <span class="radio-custom"></span>
    No
  </label>
</div>
        
      </div>
    </div>
  );
  
};

export default Signup;
