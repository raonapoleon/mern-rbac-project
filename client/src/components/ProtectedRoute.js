import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // If no user, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the child route (e.g., ProfilePage)
  return <Outlet />;
};

export default ProtectedRoute;