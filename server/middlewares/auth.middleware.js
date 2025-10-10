// middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if the request has an authorization header with a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the header (it's the second part of "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token ? 'Present' : 'Missing');

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded);

      // Find the user by ID from the decoded token payload
      // .select('-password') ensures the password is not attached to the user object
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User found:', req.user ? `${req.user.username} (${req.user.role})` : 'Not found');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // If a user is found, move on to the next middleware or route handler
      next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the request header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};