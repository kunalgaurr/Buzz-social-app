import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Bottombar.css';
import { HiHome, HiHashtag, HiUserGroup, HiUser } from 'react-icons/hi';

export const Bottombar = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <div id="bottombar-container">
      <span
        className="bottombar-children"
        onClick={() => {
          navigate('/');
        }}
      >
        <HiHome />
      </span>
      <span
        className="bottombar-children"
        onClick={() => {
          navigate('/explore');
        }}
      >
        <HiHashtag />
      </span>
      <span
        className="bottombar-children"
        onClick={() => {
          navigate('/communities');
        }}
      >
        <HiUserGroup />
      </span>
      <span
        className="bottombar-children"
        onClick={() => {
          navigate(`/profile/${currentUser._id}`);
        }}
      >
        <HiUser />
      </span>
    </div>
  );
};
