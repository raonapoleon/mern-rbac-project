import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'Admin') {
    // If user is not an Admin, send them to the home page
    return <Navigate to="/" replace />;
  }

  // If user is an Admin, render the child route
  return <Outlet />;
};

export default AdminRoute;