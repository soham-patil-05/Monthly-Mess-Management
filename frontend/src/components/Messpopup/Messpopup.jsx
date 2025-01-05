import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import cross from '../../assets/cross.jpeg';
import './Messpopup.css';

const Messpopup = ({ showmessdetail, setShowmessdetail }) => {
  const data = showmessdetail.messdetails;

  const userDataJSON = localStorage.getItem('user');
  const userData = JSON.parse(userDataJSON);
  
  const addcart = async (data) => {
    const cartinfo = {
      username: userData.username,
      _id: data._id,
      no_of_times : data.no_of_times
    };
    try {
      const response = await fetch("http://localhost:3000/addcart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartinfo) // Use cartinfo instead of data
      });

      if (response.ok) {
        alert("Subscription Added successfully");
        setShowmessdetail({ isopen: false, messdetails: null });
      } else {
        alert("Some error occured");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error:Server Error");
    }
  };

  return (
    <div className='eachmess'>
      <img src={cross} alt="" style={{ width: '50px', height: '50px' }} onClick={() => setShowmessdetail({ isopen: false, messdetails: null })} />
      <h1> Titlee : {data.title}</h1>
      <p> Description : {data.desc}</p>
      <p> Closing day : {data.closing_day}</p>
      <p> Time : {data.time_of_closing}</p>
      <p> Credits : {data.no_of_times}</p>
      <p> Price : {data.price}</p>
      <button onClick={() => addcart(data)}>Buy Subscription</button>
    </div>
  )
}

export default Messpopup;
