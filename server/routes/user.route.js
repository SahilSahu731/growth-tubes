import express from 'express';
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, googleAuthCallback, getGoogleAuthUser } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',protect, logoutUser)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=authentication_failed`,
    session: false 
  }),
  googleAuthCallback
);

router.get('/auth/google/user/:userId', getGoogleAuthUser);

export default router;