import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './redux/reducers/authenticationSlice';
import ProtectedRoute from './protectedRoute/ProtectedRoute';


const App = () => {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authentication);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      const userData = JSON.parse(storedUser);
      dispatch(loginSuccess({ ...userData, token: storedToken })); 
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/game" /> : <LoginPage />} 
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>

  );
};

export default App;
