import React, { useState } from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import { BsFillPencilFill } from 'react-icons/bs';
import './NewCommunity.css';
import { useDispatch, useSelector } from 'react-redux';
import { createCommunity } from '../../redux/communityReducer';
import { useNavigate } from 'react-router-dom';

export const NewCommunity = () => {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const data = {
      admin: user._id,
      name: name,
      description: description,
    };
    dispatch(createCommunity(data));
    navigate('/');
  };
  return (
    <Wrapper>
      <Topbar />
      <PageWrapper>
        <div id="new-community-container">
          <img src="/assets/bg.jpg" alt="" id="new-community-background" />
          <div id="new-community-wrapper">
            <div id="new-community-top">
              <div id="new-community-image-container">
                <img
                  src="/assets/teamwork.png"
                  alt=""
                  id="new-community-image"
                />
                <div className="edit-image">
                  <BsFillPencilFill />
                </div>
              </div>
              <div id="input-top-right">
                <input
                  type="text"
                  id="community-name-input"
                  placeholder="Enter community name"
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Enter community description."
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div id="new-community-button">
            <button onClick={handleClick}>Create Community</button>
          </div>
        </div>
      </PageWrapper>
    </Wrapper>
  );
};
