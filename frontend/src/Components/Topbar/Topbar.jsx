import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChatAlt2, HiOutlineBell } from 'react-icons/hi';
import './Topbar.css';
import { useSelector } from 'react-redux';

export const Topbar = ({ logo, name }) => {
  const navigate = useNavigate();
  const [explore, setExplore] = useState(false);
  const [community, setCommunity] = useState(false);
  const [home, sethome] = useState(false);
  const [toggle, setToggle] = useState(false);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (window.location.pathname === '/explore') {
      setExplore(true);
    }
    if (window.location.pathname === '/community/post') {
      setCommunity(true);
    }
    if (window.location.pathname === '/') {
      sethome(true);
    }
  }, []);
  return (
    <div id="topbar-container">
      <div id="topbar-left">
        <div id="topbar-logo">
          <span id="topbar-logo-name">Buzz</span>
        </div>
        <div id="topbar-buttons">
          <div id="topbar-button-wrapper">
            <span
              id="topbar-button"
              onClick={() => navigate('/explore')}
              className={explore ? 'active' : ''}
            >
              Explore
            </span>
            <span
              id="topbar-button"
              className={community ? 'active' : ''}
              onClick={() => navigate('/community/post')}
            >
              Community
            </span>
            <span
              id="topbar-button"
              onClick={() => navigate('/')}
              className={home ? 'active' : ''}
            >
              Mutual friends <span>12+</span>
            </span>
          </div>
        </div>
      </div>
      <div id="topbar-right">
        <div id="topbar-menu" style={{ display: toggle ? 'flex' : 'none' }}>
          <span onClick={() => navigate(`/profile/${user._id}`)}>Profile</span>
          <span>Friends</span>
          <span>Settings</span>
          <span
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              localStorage.removeItem('draft');
              localStorage.removeItem('new post');
              navigate('/login');
            }}
          >
            Log out
          </span>
        </div>
        <div id="topbar-chat" onClick={() => navigate('/chat')}>
          <HiOutlineChatAlt2 className="icon" />
        </div>
        <div id="topbar-notification">
          <HiOutlineBell className="icon" />
        </div>
        <span id="topbar-name" onClick={() => navigate(`/profile/${user._id}`)}>
          {user.name}
        </span>
        <img
          src={user.image ? user.image : '/assets/user.png'}
          alt=""
          id="topbar-img"
          onClick={() => setToggle(!toggle)}
        />
      </div>
    </div>
  );
};
