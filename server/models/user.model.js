// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    minlength: 8,
    select: false, // Prevents the password from being returned in queries by default
  },
  profilePic: {
    type: String, // URL
    default: "",
  },
  bio: {
    type: String,
    maxlength: 200,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "creator", "admin"],
    default: "user",
  },
  googleId: { type: String, unique: true, sparse: true }, // for OAuth users
  subscription: {
    isActive: { type: Boolean, default: false }, // true = paid user
    plan: {
      type: String,
      enum: ["free", "monthly", "yearly"],
      default: "free",
    },
    startDate: { type: Date },
    endDate: { type: Date },
  },

  // Learning / curiosity data
  curiosityPaths: [
    {
      pathId: { type: mongoose.Schema.Types.ObjectId, ref: "CuriosityPath" },
      progress: { type: Number, default: 0 }, // percentage completed
      completed: { type: Boolean, default: false },
    },
  ],

  boards: [
    {
      boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
      title: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],

  growthJournal: [
    {
      entry: String, // reflection / insight
      resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  // Preferences
  interests: [{ type: String }], // e.g. ["philosophy", "space", "coding"]
  savedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],

  // System fields
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

const User = mongoose.model("User", userSchema);
export default User;
