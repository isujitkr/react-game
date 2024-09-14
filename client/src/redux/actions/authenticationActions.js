import API from '../../api/api';
import { loginFailure, loginStart, loginSuccess } from '../reducers/authenticationSlice';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await API.post('/user/login', credentials);
    const user = response.data;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
    dispatch(loginSuccess(user));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(loginFailure('Invalid credentials'));
    } else {
      dispatch(loginFailure('An error occurred. Please try again later.'));
    }
  }
};