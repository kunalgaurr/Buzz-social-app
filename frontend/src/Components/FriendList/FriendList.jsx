import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './FriendList.css';
import { useNavigate } from 'react-router-dom';

export const FriendList = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`/user/friends/${user._id}`);
      setFriends(res.data);
    };

    getFriends();
  }, [user]);
  return (
    <div id="friend-list-container">
      <span id="chat-heading">Your friends.</span>
      <div id="friend-list-search-bar">
        <input
          type="text"
          id="friend-list-search-input"
          placeholder="Search for your friends"
        />
      </div>
      {friends.map((friend) => (
        <div
          id="friend-account"
          onClick={() => navigate(`/chat/${friend._id}`)}
        >
          <img src={friend?.image} alt="" id="friend-image" />
          <div id="friend-right">
            <span id="friend-name">{friend?.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
