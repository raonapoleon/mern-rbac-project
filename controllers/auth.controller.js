import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Helper to set the cookie
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // --- THE FIX IS HERE ---
  const cookieOptions = {
    httpOnly: true,
    // "secure" must be true for "sameSite: none" to work
    secure: true, 
    // "none" allows the cookie to be sent between Vercel and Render
    sameSite: 'none', 
    maxAge: 60 * 60 * 1000, // 1 hour
  };

  res.cookie('accessToken', token, cookieOptions);

  res.status(statusCode).json({
    _id: user._id,
    username: user.username,
    role: user.role,
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      // Use the helper to send the token immediately upon registration
      sendToken(user, 201, res);
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.comparePassword(password))) {
      sendToken(user, 200, res);
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: true,      // Must match login settings
    sameSite: 'none',  // Must match login settings
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};