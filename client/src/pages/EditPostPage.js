import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post. You may not have permission.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`/api/posts/${id}`, { title, content });
      navigate('/posts');
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  return (
    <div className="page-container">
      <h2>Edit Post</h2>
      {loading && <p>Loading post data...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Post</button>
          <button 
            type="button" 
            className="secondary" 
            style={{ marginLeft: '10px' }} 
            onClick={() => navigate('/posts')}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default EditPostPage;