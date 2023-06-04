import React, { useEffect, useState } from 'react';
import './Comment.css';
import axios from 'axios';

export const Comment = ({ comment }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/user/${comment.userId}`);
      setUser(res.data);
    };

    getUser();
  }, [comment]);
  return (
    <div id="comment-container">
      <img
        src={user?.image ? user?.image : '/assets/user.png'}
        alt=""
        id="comment-user-img"
      />
      <div id="comment-right">
        <span id="comment-user-name">{user?.name}</span>
        <span id="comment-text">{comment.comment}</span>
      </div>
    </div>
  );
};
