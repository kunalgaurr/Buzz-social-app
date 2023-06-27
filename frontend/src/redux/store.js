import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authReducer';
import thunk from 'redux-thunk';
import { postReducer } from './postReducer';
import { commentReducer } from './commentReducer';
import { communityReducer } from './communityReducer';

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  comment: commentReducer,
  community: communityReducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export default store;
