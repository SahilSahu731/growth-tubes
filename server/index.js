import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';

dotenv.config();
import cookieParser from 'cookie-parser';

import passport from 'passport';
import './config/passport.js'; 
import userRoutes from './routes/user.route.js';
import categoryRoutes from './routes/category.route.js';
import roadmapRoutes from './routes/roadmap.route.js';
import adminRoutes from './routes/admin.route.js';
import connectDB from './config/db.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Growth Tubes API Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('\n✅ Server started successfully!');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});