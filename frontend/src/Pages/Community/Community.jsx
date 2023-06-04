import React from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';

export const Community = () => {
  return (
    <Wrapper>
      <div id="community-container">
        <Topbar />
        <PageWrapper></PageWrapper>
      </div>
    </Wrapper>
  );
};
