import Post from '../models/post.model.js';
import User from '../models/user.model.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private (Admin, Editor)
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const post = new Post({
      title,
      content,
      author: req.user._id,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private (Any logged-in user)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Private (Any logged-in user)
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Admin, Editor)
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isAuthor = post.author.toString() === req.user._id.toString();

    if (req.user.role !== 'Admin' && !isAuthor) {
      return res.status(403).json({ message: 'Forbidden: You can only edit your own posts' });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Admin, Editor)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isAuthor = post.author.toString() === req.user._id.toString();

    if (req.user.role !== 'Admin' && !isAuthor) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own posts' });
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};