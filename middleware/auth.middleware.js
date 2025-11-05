// ---- middleware/auth.middleware.js ----

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// This is our "gatekeeper" middleware
export const protect = async (req, res, next) => {
  let token;

  // 1. Read the token from the cookie
  token = req.cookies.accessToken;

  if (!token) {
    // 401 = Unauthorized
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Get user from the token's ID (the 'userId' we put in the payload)
    // and attach it to the request object for all future routes
    req.user = await User.findById(decoded.userId).select('-password');

    // 4. Call the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};