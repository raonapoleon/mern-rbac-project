

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    // This creates a reference to the User model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // We add an index for better query performance
    index: true, 
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

const Post = mongoose.model('Post', postSchema);

export default Post;