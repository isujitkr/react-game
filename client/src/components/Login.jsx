import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/authenticationActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.authentication);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return setErrorMessage('Please fill out all the details');
    }

    dispatch(loginUser(formData)); 
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Only navigate after successful login
      navigate('/game');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Update local error message based on Redux error state
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
        <div className="flex gap-2 text-sm mt-3 text-slate-600">
          <span className="font-serif text-slate-600">Don't Have an account?</span>
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default Login;