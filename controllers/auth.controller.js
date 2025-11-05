// ---- controllers/auth.controller.js ----

import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      // 400 = Bad Request
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. If user doesn't exist, create them
    const user = await User.create({
      username,
      email,
      password,
    });

    // 3. Respond with the new user (but not the password)
    if (user) {
      // 201 = Resource Created
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // 500 = Internal Server Error
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email }).select('+password');

    // 2. Check if user exists AND if the password is correct
    if (user && (await user.comparePassword(password))) {
      // 3. If yes, create a token
      const token = jwt.sign(
        { userId: user._id, role: user.role }, // This is the data we're encoding
        process.env.JWT_SECRET, // This is our secret key
        { expiresIn: '1h' } // The token will expire in 1 hour
      );

      // 4. Send the token in an httpOnly cookie
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      // 5. Send back the user data (without the password)
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      // 401 = Unauthorized
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (Needs to be protected)
export const getUserProfile = async (req, res) => {
  // req.user was added by our 'protect' middleware
  if (req.user) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = (req, res) => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    expires: new Date(0), // Set to a past date
  });
  res.status(200).json({ message: 'Logged out successfully' });
};