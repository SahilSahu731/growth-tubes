import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["article", "video", "book", "course", "documentation", "tutorial", "practice", "project"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 300,
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  estimatedTime: {
    type: String, // e.g., "2 hours", "1 week", "3 days"
  },
  isFree: {
    type: Boolean,
    default: true,
  },
});

const topicSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 300,
  },
  resources: [resourceSchema],
  estimatedTime: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const nodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  type: {
    type: String,
    enum: ["topic", "skill", "milestone", "project", "assessment"],
    default: "topic",
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  estimatedDuration: {
    type: String, // e.g., "2 weeks", "1 month"
  },
  prerequisites: [{
    type: String, // node IDs that must be completed first
  }],
  topics: [topicSchema],
  position: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  color: {
    type: String,
    default: "#3B82F6",
  },
  icon: {
    type: String,
    default: "📚",
  },
  isOptional: {
    type: Boolean,
    default: false,
  },
  completionCriteria: [{
    type: String,
  }],
});

const levelSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  order: {
    type: Number,
    required: true,
  },
  nodes: [nodeSchema],
  estimatedDuration: {
    type: String,
  },
  objectives: [{
    type: String,
  }],
  color: {
    type: String,
    default: "#3B82F6",
  },
});

const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Roadmap title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Roadmap description is required"],
    maxlength: 1000,
  },
  shortDescription: {
    type: String,
    maxlength: 200,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  thumbnail: {
    type: String,
    default: "",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  // Roadmap Structure
  levels: [levelSchema],
  connections: [{
    from: {
      type: String,
      required: true, // node ID
    },
    to: {
      type: String,
      required: true, // node ID
    },
    type: {
      type: String,
      enum: ["prerequisite", "suggested", "alternative"],
      default: "prerequisite",
    },
  }],
  
  // Metadata
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "mixed"],
    default: "mixed",
  },
  estimatedDuration: {
    type: String, // e.g., "6 months", "1 year"
  },
  tags: [{
    type: String,
    trim: true,
  }],
  
  // View Options
  viewTypes: [{
    type: String,
    enum: ["space", "linear", "tree", "grid"],
    default: "space",
  }],
  defaultView: {
    type: String,
    enum: ["space", "linear", "tree", "grid"],
    default: "space",
  },
  
  // Engagement
  followersCount: {
    type: Number,
    default: 0,
  },
  forksCount: {
    type: Number,
    default: 0,
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  
  // Status
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOfficial: {
    type: Boolean,
    default: false,
  },
  
  // Additional Info
  targetAudience: [{
    type: String,
  }],
  prerequisites: [{
    type: String,
  }],
  outcomes: [{
    type: String, // What you'll achieve after completing this roadmap
  }],
  
  // Versioning
  version: {
    type: String,
    default: "1.0.0",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-update lastUpdated
roadmapSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Generate slug from title if not provided
roadmapSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;