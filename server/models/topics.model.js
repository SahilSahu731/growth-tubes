import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
  },
  parent_topic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    default: null
  },
  icon: {
    type: String, // e.g., URL or icon class name
    default: null
  },
  color: {
    type: String, // hex code or tailwind class
    default: null
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  resource_count: {
    type: Number,
    default: 0
  },
  // --- ✅ Added Useful Fields ---
  level: {
    type: Number,
    default: 1, // depth level for nested topics
  },
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  is_active: {
    type: Boolean,
    default: true
  },
  seo: {
    title: { type: String, trim: true },
    keywords: [{ type: String, trim: true }],
    meta_description: { type: String, trim: true }
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Indexes for performance
TopicSchema.index({ slug: 1 });
TopicSchema.index({ parent_topic_id: 1 });
TopicSchema.index({ is_featured: 1 });
TopicSchema.index({ name: 'text', description: 'text' }); // for search

const Topic = mongoose.model('Topic', TopicSchema);

export default Topic;
