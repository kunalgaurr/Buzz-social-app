import React, { useEffect, useState } from 'react';
import { UserSuggestion } from '../UserSuggestion/UserSuggestion';
import axios from 'axios';
import './RandomUser.css'

export const RandomUser = () => {
  const [users, setUsers] = useState(null);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('/user/all');
      setUsers(res.data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (users) {
      const shuffledUsers = shuffleArray(users);

      const randomUsers = shuffledUsers.slice(0, 2);

      setRandomUsers(randomUsers);
    }
  }, [users]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  if (!users) {
    return <span>Loading...</span>;
  }

  return (
    <div id="random-user-container">
      <span id="random-user-header">People you may know.</span>
      <div id="random-user-body">
        {randomUsers.map((user) => (
          <UserSuggestion key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
