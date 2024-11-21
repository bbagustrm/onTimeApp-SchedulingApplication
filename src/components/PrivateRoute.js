import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Ambil status login dari localStorage
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;