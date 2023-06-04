import React from 'react';
import { RandomUser } from '../RandomUser/RandomUser';
import './Rightbar.css';
import { Footer } from '../Footer/Footer';

export const Rightbar = () => {
  return (
    <div id="rightbar-container">
      <RandomUser />
      <Footer />
    </div>
  );
};
