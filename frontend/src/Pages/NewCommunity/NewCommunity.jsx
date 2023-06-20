import React from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import { BsFillPencilFill } from 'react-icons/bs';
import './NewCommunity.css';

export const NewCommunity = () => {
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
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Enter community description."
                ></textarea>
              </div>
            </div>
          </div>
          <div id="new-community-button">
            <button>Create Community</button>
          </div>
        </div>
      </PageWrapper>
    </Wrapper>
  );
};
