import mongoose from "mongoose";

const curiosityPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  estimatedDuration: {
    type: Number, // in hours
    default: 0,
  },
  resources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CuriosityPath = mongoose.model("CuriosityPath", curiosityPathSchema);
export default CuriosityPath;