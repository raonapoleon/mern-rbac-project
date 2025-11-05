import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';

// Page Imports
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import PostsPage from './pages/PostsPage';
import EditPostPage from './pages/EditPostPage';

// Route Protection Imports
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="App">
      <nav>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {user && <Link to="/posts">Posts</Link>}
        </div>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              {user.role === 'Admin' && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      
      <h1 className="App-header">RBAC MERN Project</h1>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<div className="page-container"><h2>Home Page</h2></div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:id/edit" element={<EditPostPage />} />
        </Route>

        {/* Admin-Only Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;