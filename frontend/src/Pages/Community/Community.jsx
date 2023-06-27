import React from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';

export const Community = () => {
  return (
    <Wrapper>
        <Topbar />
        <PageWrapper>
          <div id="community-wrapper">
            <img src="" alt="" id="community-cover" />
            <div id="community-top">
              <img src="" alt="" id="community-image" />
              <div id="community-top-right">
                <span id="community-name"></span>
                <span id="community-description"></span>
                <span id="community-members"></span>
              </div>
            </div>
            
          </div>
        </PageWrapper>
    </Wrapper>
  );
};
