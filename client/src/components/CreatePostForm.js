import React, { useState } from 'react';
import axios from 'axios';

function CreatePostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/posts', { title, content });
      onPostCreated(res.data);
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <h4>Create New Post</h4>
      {error && <p className="error-message">{error}</p>}
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
      <button typeF="submit">Create Post</button>
    </form>
  );
}

export default CreatePostForm;