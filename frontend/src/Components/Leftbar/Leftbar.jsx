import React, { useEffect, useState } from 'react';
import './Leftbar.css';
import {
  HiSearch,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineCurrencyRupee,
  HiOutlineNewspaper,
} from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SearchResult } from '../SearchResult/SearchResult';

export const Leftbar = () => {
  const navigate = useNavigate();
  const [home, setHome] = useState(false);
  const [community, setCommunity] = useState(false);
  const [marketplace, setMarketplace] = useState(false);
  const [news, setNews] = useState(false);
  const [users, setUsers] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('/user/all');
      setUsers(res.data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (window.location.pathname === '/') {
      setHome(true);
    }
    if (window.location.pathname === '/community/post') {
      setCommunity(true);
    }
    if (window.location.pathname === '/marketplace') {
      setMarketplace(true);
    }
    if (window.location.pathname === '/news') {
      setNews(true);
    }
  }, []);

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchValue)
    );
    setSearchResults(filteredUsers);
  };

  return (
    <div id="leftbar-container">
      <div id="leftbar-wrapper">
        <div
          id="search-results"
          style={{ transform: toggle ? 'translateY(0)' : 'translateY(-100%)' }}
        >
          <SearchResult users={searchResults} />
        </div>
        <div id="leftbar-logo">
          <img src="/assets/bee.png" alt="" id="leftbar-logo-img" />
          <span id="leftbar-logo-name">Buzz</span>
        </div>
        <div id="leftbar-search-container">
          <div id="leftbar-search">
            <HiSearch />
            <input
              type="text"
              id="leftbar-search-input"
              placeholder="Explore buzz"
              onChange={handleSearchInputChange}
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
        <div id="leftbar-options">
          <Link
            className={home ? 'leftbar-option active' : 'leftbar-option'}
            to="/"
          >
            <HiOutlineHome className="icon" /> Home
          </Link>
          <Link
            className={community ? 'leftbar-option active' : 'leftbar-option'}
            to="/community/post"
          >
            <HiOutlineUserGroup className="icon" />
            Community
          </Link>
          <Link
            className={marketplace ? 'leftbar-option active' : 'leftbar-option'}
            to="/market/place"
          >
            <HiOutlineCurrencyRupee className="icon" /> Marketplace
          </Link>
          <Link
            className={news ? 'leftbar-option active' : 'leftbar-option'}
            to="/news"
          >
            <HiOutlineNewspaper className="icon" /> News Feed
          </Link>
        </div>
        <hr style={{ borderWidth: '1px', borderColor: '#303030' }} />
        <div id="leftbar-communities">
          <div
            id="leftbar-community"
            onClick={() => navigate('/community/new')}
          >
            <img src="/assets/plus.png" alt="" id="leftbar-community-img" />
            <span id="leftbar-commnunity-name">Create a community</span>
          </div>
        </div>
        <div id="leftbar-events">
          <div id="leftbar-event"></div>
          <div id="leftbar-event"></div>
          <div id="leftbar-event"></div>
        </div>
      </div>
    </div>
  );
};
