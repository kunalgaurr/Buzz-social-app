import React from 'react';
import { Rightbar } from '../Rightbar/Rightbar';
import './PageWrapper.css'

export const PageWrapper = ({ children }) => {
  return (
    <div id="page-wrapper-container">
      <div id="main-page">{children}</div>
      <div id="fised-component">
        <Rightbar />
      </div>
    </div>
  );
};
