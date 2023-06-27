import React from 'react';
import { Rightbar } from '../Rightbar/Rightbar';
import './PageWrapper.css';
import { Bottombar } from '../Bottombar/Bottombar';

export const PageWrapper = ({ children }) => {
  return (
    <div id="page-wrapper-container">
      <div id="main-page">
        {children}
        <Bottombar />
      </div>
      <div id="fised-component">
        <Rightbar />
      </div>
    </div>
  );
};
