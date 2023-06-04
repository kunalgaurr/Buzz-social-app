import React from 'react';
import './ErrorMessage.css';

export const ErrorMessage = ({ error }) => {
  return (
    <div
      id="error-wrapper"
      style={{ display: error === undefined ? 'none' : 'block' }}
    >
      <span id="error-message">{`Error: ${error}`}</span>
    </div>
  );
};
