import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null; 
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload; 
      state.error = null; 
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null; 
      state.error = action.payload; 
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null; 
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
