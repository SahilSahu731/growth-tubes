import Roadmap from "../models/roadmap.model.js";

// Get all roadmaps
export const getRoadmaps = async (req, res) => {
  try {
    const { status, category, difficulty, featured } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (featured) filter.isFeatured = featured === 'true';
    
    const roadmaps = await Roadmap.find(filter)
      .populate("category", "name icon color")
      .populate("creator", "username email")
      .sort({ createdAt: -1 });
    
    res.status(200).json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single roadmap
export const getRoadmap = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const roadmap = await Roadmap.findOne({ slug })
      .populate("category", "name icon color")
      .populate("creator", "username email");
    
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }
    
    res.status(200).json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create roadmap (Admin only)
export const createRoadmap = async (req, res) => {
  try {
    console.log('Creating roadmap with data:', req.body);
    console.log('User ID:', req.user.id);
    
    const roadmapData = {
      ...req.body,
      creator: req.user.id,
    };
    
    console.log('Final roadmap data:', roadmapData);
    
    const roadmap = new Roadmap(roadmapData);
    await roadmap.save();
    
    await roadmap.populate("category", "name icon color");
    await roadmap.populate("creator", "username email");
    
    res.status(201).json(roadmap);
  } catch (error) {
    console.error('Roadmap creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update roadmap (Admin only)
export const updateRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    
    const roadmap = await Roadmap.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate("category", "name icon color")
    .populate("creator", "username email");
    
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }
    
    res.status(200).json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete roadmap (Admin only)
export const deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    
    const roadmap = await Roadmap.findByIdAndDelete(id);
    
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }
    
    res.status(200).json({ message: "Roadmap deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle roadmap status (Admin only)
export const toggleRoadmapStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const roadmap = await Roadmap.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
    .populate("category", "name icon color")
    .populate("creator", "username email");
    
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }
    
    res.status(200).json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fork roadmap (Authenticated users)
export const forkRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    
    const originalRoadmap = await Roadmap.findById(id);
    if (!originalRoadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }
    
    const forkedRoadmap = new Roadmap({
      ...originalRoadmap.toObject(),
      _id: undefined,
      title: `${originalRoadmap.title} (Fork)`,
      slug: `${originalRoadmap.slug}-fork-${Date.now()}`,
      creator: req.user.id,
      status: "draft",
      followersCount: 0,
      forksCount: 0,
      rating: { average: 0, count: 0 },
    });
    
    await forkedRoadmap.save();
    
    // Increment fork count of original
    await Roadmap.findByIdAndUpdate(id, { $inc: { forksCount: 1 } });
    
    await forkedRoadmap.populate("category", "name icon color");
    await forkedRoadmap.populate("creator", "username email");
    
    res.status(201).json(forkedRoadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};