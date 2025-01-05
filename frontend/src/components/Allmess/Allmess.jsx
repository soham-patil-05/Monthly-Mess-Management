import React, { useState, useEffect } from 'react';
import './Allmess.css';

const Allmess = ({ setShowmessdetail }) => {
  const [messes, setMesses] = useState([]);

  useEffect(() => {
    fetchMesses();
  }, []);

  const fetchMesses = async () => {
    try {
      const response = await fetch('http://localhost:3000/allmess');
      if (!response.ok) {
        throw new Error('Failed to fetch mess data');
      }
      const data = await response.json();
      setMesses(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const messpopup = (mess) => {
    setShowmessdetail({
      isopen: true,
      messdetails: mess
    });
  };

  return (
    <div className='allmesses'>
      <hr />
      <h1 style={{ textAlign: 'center' }}>Choose Your Mess Subscriptions</h1>
      <hr />
      <div className='messes'>
        {messes.map((mess, index) => (
          <div id={mess.title} className='mess' key={mess._id}>
            <h2>  {mess.title}</h2>
            <p>  {mess.desc}</p>
            <p> Price: {mess.price}</p>
            <button onClick={() => messpopup(mess)}>Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allmess;

