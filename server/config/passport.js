import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug: Check if environment variables are loaded
// console.log('Environment Variables Check:');
// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Loaded ✓' : 'Missing ✗');
// console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Loaded ✓' : 'Missing ✗');
// console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);

// Validate required environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing required Google OAuth environment variables. Please check your .env file.');
}

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: false,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google Profile:', {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          displayName: profile.displayName
        });

        const email = profile.emails?.[0]?.value;
        
        if (!email) {
          return done(new Error('No email found in Google profile'), null);
        }

        // Check if user exists by email (in case they signed up normally first)
        let user = await User.findOne({ email });

        if (user) {
          // User exists - link Google ID if not already linked
          if (!user.googleId) {
            user.googleId = profile.id;
            
            // Update profile pic if not set
            if (!user.profilePic && profile.photos?.[0]?.value) {
              user.profilePic = profile.photos[0].value;
            }
            
            await user.save();
            console.log('Linked Google account to existing user:', user.email);
          }
          return done(null, user);
        }

        // Create new user
        // Generate a unique username from display name
        let baseUsername = profile.displayName
          ?.replace(/\s+/g, '_')
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, '') || 'user';
        
        let username = baseUsername;
        let counter = 1;
        
        // Ensure username is unique
        while (await User.findOne({ username })) {
          username = `${baseUsername}_${counter}`;
          counter++;
        }

        // Generate a random password (user won't use it, but schema requires it)
        const randomPassword = Math.random().toString(36).slice(-12) + 'Aa1!';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(randomPassword, salt);

        user = await User.create({
          username,
          email,
          password: hashedPassword,
          googleId: profile.id,
          profilePic: profile.photos?.[0]?.value || '',
          isActive: true,
          role: 'user',
        });

        console.log('Created new user via Google OAuth:', user.email);
        return done(null, user);
        
      } catch (error) {
        console.error('Google OAuth Error:', error);
        return done(error, null);
      }
    }
  )
);

console.log('✅ Google OAuth Strategy configured successfully');

export default passport;