import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const FriendList = () => {
  const user = useSelector((state) => state.auth.user);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`/user/friends/${user._id}`);
      setFriends(res.data);
    };

    getFriends();
  });
  console.log(user._id);
  console.log(user);
  return (
    <div id="friend-list-container">
      <span id="friend-list-title">Here are all your friends.</span>
      {friends.map((friend) => (
        <div id="friend-account">
          <img src={user.image} alt="" id="friend-image" />
          <div id="friend-right">{user.name}</div>
        </div>
      ))}
    </div>
  );
};
