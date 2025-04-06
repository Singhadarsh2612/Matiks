import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies (existing approach)
  token = req.cookies.jwt;

  // Fallback to Authorization header if cookie not found
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user to request object
    req.user = await User.findById(decoded.userId).select('-password');
    
    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

export { protect };