import React, { useEffect, useState } from 'react';
import './ChatBox.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const ChatBox = () => {
  const { friendId } = useParams();
  const [friend, setFriend] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getFriend = async () => {
      const res = await axios.get(`/user/${friendId}`);
      setFriend(res.data);
    };

    getFriend();
  }, [friendId]);

  return (
    <div id="chat-box-container">
      <div id="chat-box-top">
        <img
          src={friend.image}
          alt=""
          id="chat-box-user-image"
          onClick={() => navigate(`/profile/${friendId}`)}
        />
        <span
          id="chat-box-user-name"
          onClick={() => navigate(`/profile/${friendId}`)}
        >
          {friend.name}
        </span>
      </div>
      <div id="chats-container">
        <span className="message-left">Hi how are you?</span>
        <span className="message-right">
          I am fine thank you, How are you ? Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Labore corrupti quasi eos eum repellat
          maiores eaque distinctio, quam repudiandae possimus, aspernatur
          mollitia veritatis odio quo doloribus soluta ratione enim eligendi!
        </span>
      </div>
      <div id="chat-box-bottom">
        <input type="text" id="chat-box-input" placeholder="Send a message" />
        <button id="chat-box-send">Send</button>
      </div>
    </div>
  );
};
