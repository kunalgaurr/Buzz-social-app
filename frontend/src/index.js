import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';

axios.defaults.baseURL = 'http://localhost:8000/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </SkeletonTheme>
);
