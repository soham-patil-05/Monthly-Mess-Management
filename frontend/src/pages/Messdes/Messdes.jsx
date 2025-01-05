
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Messdes.css'

const Messdes = (props) => {
  // State variables to store input values
  const navigate = useNavigate();
  const owner_1 = localStorage.getItem('user');
  const owner = JSON.parse(owner_1);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [no_of_times, setNo_of_times] = useState('');
  const [closing_day, setClosing_day] = useState('');
  const [time_of_closing, setTime_of_closing] = useState(''); 
  

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create a data object with input values
    const data = {
      owner : owner.username,
      title: title,
      desc: desc,
      price: parseFloat(price),
      no_of_times : parseFloat(no_of_times),
      closing_day : closing_day,
      time_of_closing : time_of_closing
    };

    try {
      const response = await fetch("http://localhost:3000/mess", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // If request is successful, display success message
        alert("Mess added to M3");
        setTitle('');
        setDesc('');
        setPrice('');
        setNo_of_times('');
        setClosing_day('');
        setTime_of_closing('');
        navigate('/Alluser');

      } else {
        // If request is unsuccessful, display error message
        alert("Error: Mess could not be added to M3");
      }
    } catch (error) {
      // Handle any errors that occur during fetch request
      console.error('Error:', error);
      alert("Error: Mess could not be added to M3");
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Enter title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br /><br />
        <label htmlFor="desc">Enter description:</label>
        <textarea id="desc" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
        <br /><br />
        <label htmlFor="price">Enter price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br /><br />
        <label htmlFor="no_of_times">Enter No of Times:</label>
        <input type="number" id="no_of_times" value={no_of_times} onChange={(e) => setNo_of_times(e.target.value)} />
        <br /><br />
        <label htmlFor="closing_day">Enter Closing day of mess:</label>
        <input type="text" id="closing_day" value={closing_day} onChange={(e) => setClosing_day(e.target.value)} />
        <br /><br />
        <label htmlFor="time_of_closing">Time of Closing Day:</label>
        <input type="text" id="time_of_closing" value={time_of_closing} onChange={(e) => setTime_of_closing(e.target.value)} />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Messdes;
