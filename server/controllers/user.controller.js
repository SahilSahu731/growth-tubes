import User from "../models/user.model.js";
import CuriosityPath from "../models/curiosityPath.model.js";
import Board from "../models/board.model.js";
import Resource from "../models/resource.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with that email already exists" });
    }

    // Hash the password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Placeholder for sending a welcome email
    // await sendWelcomeEmail(user.email, user.username);

    // Respond with user data and a JWT token
    if (user) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic || '',
        bio: user.bio || '',
        role: user.role,
        subscription: user.subscription,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please register" });
    }   

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "User logged in successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic || '',
      bio: user.bio || '',
      role: user.role,
      subscription: user.subscription,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logoutUser = (req, res) => {
  // On the server-side, you don't need to do anything with the token.
  // The client will simply remove it. This endpoint serves as a confirmation.
  res.status(200).json({ message: 'Logged out successfully' });
};

export const googleAuthCallback = async (req, res) => {
  try {
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?token=${token}&userId=${req.user._id}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/login?error=authentication_failed`);
  }
};

// Get user data after OAuth
export const getGoogleAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      success: true,
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic || '',
      bio: user.bio || '',
      role: user.role,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('curiosityPaths.pathId', 'title description')
      .populate('boards.boardId', 'title')
      .populate('savedResources', 'title type');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        bio: user.bio,
        role: user.role,
        subscription: user.subscription,
        curiosityPaths: user.curiosityPaths,
        boards: user.boards,
        growthJournal: user.growthJournal,
        interests: user.interests,
        savedResources: user.savedResources,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only allow updating specific fields (no email or password)
    const allowedUpdates = ['username', 'bio', 'profilePic', 'interests'];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profilePic: updatedUser.profilePic,
        interests: updatedUser.interests,
        role: updatedUser.role
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};