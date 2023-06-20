import React, { useState } from 'react';
import './ErrorMessage.css';

export const ErrorMessage = ({ error }) => {
  const [toggle, setToggle] = useState(false);

  if (error) {
    setToggle(true);
    setTimeout(() => {
      setToggle(false);
    }, 3000);
  }

  return (
    <div
      id="error-wrapper"
      style={{ display: error && toggle ? 'block' : 'None' }}
    >
      <span id="error-message">{`Error: ${error}`}</span>
    </div>
  );
};
