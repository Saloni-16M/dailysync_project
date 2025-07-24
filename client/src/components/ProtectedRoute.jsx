import React from 'react';
import { Navigate } from 'react-router-dom';
import isTokenExpired from '../utils/isTokenExpired';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const expired = isTokenExpired();

  return token && !expired ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
