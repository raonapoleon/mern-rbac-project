import express from 'express';
import {
  createPost,
  getPosts,
  getPostById, // <-- 1. IMPORT
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/authorize.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize(['Admin', 'Editor']), createPost)
  .get(protect, getPosts);

router.route('/:id')
  .get(protect, getPostById) // <-- 2. ADD THIS ROUTE
  .put(protect, authorize(['Admin', 'Editor']), updatePost)
  .delete(protect, authorize(['Admin', 'Editor']), deletePost);

export default router;