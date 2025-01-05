import React, { useState, useEffect } from 'react';
import './Wallet.css';

const Wallet = () => {
  const [messdata, setMessdata] = useState([]);
  const user = localStorage.getItem('user');
  const userparsed = JSON.parse(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/allmess');
        if (!response.ok) {
          throw new Error('Failed to fetch mess data');
        }
        const data = await response.json();
        setMessdata(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='walletmesses'>
      {messdata.map((mess) => {
        const subscribedMess = mess.users_of_mess.find(user => user.username === userparsed.username);
        if (subscribedMess) {
          return (
            <div key={mess._id}>
              <h2>{mess.title}</h2>
              <p>{mess.desc}</p>
              <p>Credits: {subscribedMess.credits}</p>
            </div>
          );
        }
        return null; // Skip rendering if the user is not subscribed to this mess
      })}
    </div>
  );
};

export default Wallet;
