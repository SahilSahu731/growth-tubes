import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["article", "blog", "image", "slides", "pdf", "audio", "infographic", "worksheet", "checklist", "template"],
    required: true,
  },
  content: {
    type: String, // For articles/blogs - rich text content
  },
  fileUrl: {
    type: String, // For files, images, PDFs, slides
  },
  description: {
    type: String,
    maxlength: 500,
  },
  order: {
    type: Number,
    required: true,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
  estimatedReadTime: {
    type: Number, // in minutes
    default: 0,
  },
});

const levelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // e.g., "Foundation", "Intermediate", "Advanced", "Mastery"
  },
  description: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  resources: [resourceSchema],
  objectives: [{
    type: String, // What students will achieve in this level
  }],
  estimatedDuration: {
    type: Number, // total level duration in hours
    default: 0,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
    maxlength: 2000,
  },
  shortDescription: {
    type: String,
    maxlength: 200,
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
  levels: [levelSchema],
  
  // Pricing
  pricing: {
    type: {
      type: String,
      enum: ["free", "paid", "freemium"], // freemium = some levels free, some paid
      default: "free",
    },
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    freePreviewLevels: {
      type: Number, // How many levels are free in freemium model
      default: 0,
    },
  },
  
  // Course Info
  tags: [{
    type: String,
    trim: true,
  }],
  language: {
    type: String,
    default: "English",
  },
  skillLevel: {
    type: String,
    enum: ["all-levels", "beginner", "intermediate", "advanced"],
    default: "all-levels",
  },
  
  // Engagement
  enrollmentCount: {
    type: Number,
    default: 0,
  },
  completionCount: {
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
  
  // Course Structure
  requirements: [{
    type: String,
  }],
  whatYouWillLearn: [{
    type: String,
  }],
  targetAudience: [{
    type: String,
  }],
  
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
  
  // Metadata
  totalDuration: {
    type: Number, // total course duration in hours
    default: 0,
  },
  totalResources: {
    type: Number,
    default: 0,
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

// Auto-update metadata before saving
courseSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  
  // Calculate total duration and resources
  if (this.levels && this.levels.length > 0) {
    this.totalDuration = this.levels.reduce((total, level) => total + level.estimatedDuration, 0);
    this.totalResources = this.levels.reduce((total, level) => total + level.resources.length, 0);
  }
  
  next();
});

const Course = mongoose.model("Course", courseSchema);
export default Course;