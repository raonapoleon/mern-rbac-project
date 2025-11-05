import React from 'react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile Page</h2>
      <h3>Welcome, {user.username}!</h3>
      <p>Your Email: {user.email}</p>
      <p>Your Role: {user.role}</p>
    </div>
  );
}

export default ProfilePage;