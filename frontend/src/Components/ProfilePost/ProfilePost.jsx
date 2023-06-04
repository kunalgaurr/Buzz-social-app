import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePost.css';

export const ProfilePost = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/post/${data._id}`);
  };
  return (
    <div id="profile-post-container" onClick={handleClick}>
      <img src={data.image} alt="" id="profie-post-img" />
      <span id="profile-post-span">See Post</span>
    </div>
  );
};
