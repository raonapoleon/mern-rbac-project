import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Private Route (Any logged-in user)
router.get('/profile', protect, getUserProfile);

export default router;