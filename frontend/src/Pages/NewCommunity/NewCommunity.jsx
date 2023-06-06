import React from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import './NewCommunity.css';

export const NewCommunity = () => {
  return (
    <Wrapper>
      <Topbar />
      <PageWrapper>
        <div id="new-community-container">
          <div id="new-community-top">
            <img
              src="/assets/add-image.png"
              alt=""
              id="new-community-cover-image"
            />
            <div id="new-community-top-wrapper">
              <img
                src="/assets/image.png"
                alt=""
                id="new-community-profile-image"
              />
              <label htmlFor="name">
                <span className="new-community-label">
                  Enter Community Name:
                </span>
                <input type="text" name="name" id="" />
              </label>
            </div>
          </div>
          <div id="new-community-details">
            <label htmlFor="">
              <span className="new-community-label">
                Write something about the community:
              </span>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </label>
          </div>
        </div>
      </PageWrapper>
    </Wrapper>
  );
};
