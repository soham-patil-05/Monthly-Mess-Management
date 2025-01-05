import React, { useState, useEffect } from 'react';
import './Alluser.css';

const Alluser = () => {
  // Get the user info from localStorage and parse it
  const user_ = localStorage.getItem('user');
  const user_info = user_ ? JSON.parse(user_) : null;

  const [allusers, setAllusers] = useState([]); // State to store all users
  const [error, setError] = useState(null); // State to track errors

  // Fetch user information from the backend
  const fetchUsersInfo = async () => {
    if (!user_info) {
      console.error('User not logged in');
      setError('User not logged in');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/mess_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner: user_info.username }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users. Please check the backend.');
      }

      const userData = await response.json();
      if (Array.isArray(userData)) {
        setAllusers(userData); // Update the state with the fetched users
      } else {
        console.error('Error: Received data is not an array');
        setError('Data format error from backend');
      }
    } catch (err) {
      console.error('Error fetching user information:', err);
      setError(err.message);
    }
  };

  // Handle decrementing credits for a user
  const decrementCredits = async (userId) => {
    if (!user_info) {
      alert('User not logged in');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/decrementcredit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner: user_info.username,
          username: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to decrement credits');
      }

      const updatedUser = await response.json();
      // Update the specific user's data in the state
      setAllusers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === updatedUser.username ? updatedUser : user
        )
      );
      alert('Credits updated successfully');
    } catch (err) {
      console.error('Error updating credits:', err);
      alert('Error updating credits');
    }
  };

  // Fetch user information on component mount and every 10 seconds
  useEffect(() => {
    fetchUsersInfo();
    const intervalId = setInterval(fetchUsersInfo, 100); // Refresh user data every 100 mili-seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="allusers">
      {error && <p className="error">{error}</p>} {/* Display errors if any */}
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Credits</th>
            <th>Cut Credit</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {allusers.length > 0 ? (
            allusers.map((user, index) => (
              <tr key={user.username}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.credits}</td>
                <td>
                  <button onClick={() => decrementCredits(user.username)}>
                    Cut Credit
                  </button>
                </td>
                <td>
                  {/* Placeholder for displaying "completed" logic */}
                  {user.credits === 0 ? (
                    <img src="/checkmark.png" alt="Completed" />
                  ) : (
                    'In Progress'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Alluser;
