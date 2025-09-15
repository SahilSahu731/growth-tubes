import Course from "../models/course.model.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const { status, category, featured } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (featured) filter.isFeatured = featured === 'true';
    
    const courses = await Course.find(filter)
      .populate("category", "name icon color")
      .populate("creator", "username email")
      .sort({ createdAt: -1 });
    
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single course
export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await Course.findById(id)
      .populate("category", "name icon color")
      .populate("creator", "username email");
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create course (Admin only)
export const createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      creator: req.user.id,
    };
    
    const course = new Course(courseData);
    await course.save();
    
    await course.populate("category", "name icon color");
    await course.populate("creator", "username email");
    
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course (Admin only)
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await Course.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate("category", "name icon color")
    .populate("creator", "username email");
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course (Admin only)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await Course.findByIdAndDelete(id);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Publish/Unpublish course (Admin only)
export const toggleCourseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const course = await Course.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
    .populate("category", "name icon color")
    .populate("creator", "username email");
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};