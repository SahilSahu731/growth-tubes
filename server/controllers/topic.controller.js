import slugify from "slugify";
import Topic from "../models/topics.model.js";

// Get all topics (public access)
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ is_active: true })
      .populate('parent_topic_id', 'name')
      .sort({ is_featured: -1, createdAt: -1 })
      .select('-seo -created_by -updated_by');

    res.status(200).json({
      success: true,
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTopic = async (req, res) => {
  try {
    const {
      name,
      description,
      parent_topic_id,
      icon,
      tags,
      color,
      is_featured,
      seo,
    } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await Topic.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Topic already exists' });
    }

    let level = 1;
    if (parent_topic_id) {
      const parent = await Topic.findById(parent_topic_id);
      if (!parent) {
        return res.status(404).json({ success: false, message: 'Parent topic not found' });
      }
      level = (parent.level || 1) + 1;
    }

    // Create topic
    const topic = new Topic({
      name,
      slug,
      description,
      parent_topic_id: parent_topic_id || null,
      icon: icon || null,
      color: color || null,
      is_featured: !!is_featured,
      tags: tags || [],
      seo: seo || {},
      level,
      created_by: req.user?._id || null // if JWT middleware sets user
    });

    await topic.save();

    return res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      data: topic
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
