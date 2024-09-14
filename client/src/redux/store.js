import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './reducers/authenticationSlice';
import scoreReducer from './reducers/scoreSlice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    score: scoreReducer,
  },
});

export default store;