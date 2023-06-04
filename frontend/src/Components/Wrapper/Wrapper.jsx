import React from 'react';
import './Wrapper.css';
import { Leftbar } from '../Leftbar/Leftbar';

export const Wrapper = ({ children }) => {
  return (
    <div id="wrapper-container">
      <Leftbar />
      <div id="children-container">{children}</div>
    </div>
  );
};
