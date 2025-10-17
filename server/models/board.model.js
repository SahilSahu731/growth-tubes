import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
  }],
  isPrivate: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Board = mongoose.model("Board", boardSchema);
export default Board;