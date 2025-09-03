// models/user.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false, // Prevents the password from being returned in queries by default
    },
    lifeLevel: {
      type: Number,
      default: 1,
    },
    xpPoints: {
      type: Number,
      default: 0,
    },
    skillTrees: [
      {
        name: { type: String, required: true },
        level: { type: Number, default: 1 },
        xp: { type: Number, default: 0 },
      },
    ],
    streaks: {
      type: Map, // Use a Map to store different types of streaks (e.g., daily, workout)
      of: Number,
      default: {},
    },
    achievements: [
      {
        name: { type: String, required: true },
        unlockedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model('User', userSchema);
export default User;