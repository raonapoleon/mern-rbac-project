import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/posts');
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts. Are you logged in?');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const canModify = (postAuthorId) => {
    if (!user) return false;
    if (user.role === 'Admin') return true;
    if (user.role === 'Editor' && user._id === postAuthorId) return true;
    return false;
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowCreateForm(false);
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="page-container">
      <h2>Posts</h2>
      {error && <p className="error-message">{error}</p>}

      {(user?.role === 'Admin' || user?.role === 'Editor') && (
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create New Post'}
        </button>
      )}

      {showCreateForm && <CreatePostForm onPostCreated={handlePostCreated} />}

      <div style={{ marginTop: '20px' }}>
        {posts.length === 0 ? (
          <p>No posts found. Go create one!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-author">by {post.author.username}</p>
              <p className="post-content">{post.content}</p>
              
              {canModify(post.author._id) && (
                <div className="post-actions">
                  <Link to={`/post/${post._id}/edit`}>
                    <button className="secondary">Edit</button>
                  </Link>
                  <button className="danger">Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostsPage;