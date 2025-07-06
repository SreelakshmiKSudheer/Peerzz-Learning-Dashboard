const Course = require("../models/Course");
const Module = require("../models/Module"); // Adjust path as needed

// Controller functions for course management

// @desc Create a new course
// @route POST /api/courses/create
// @access Protected (educator only)
exports.createCourse = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "educator") {
      return res.status(403).json({ message: "Only educators can create courses" });
    }
    const educatorId = req.user.id || req.user._id;
    const { modules, ...rest } = req.body;

    const courseData = {
      ...rest,
      createdBy: educatorId,
      status: "draft"
    };

    // Step 1: Create the course first
    const newCourse = await Course.create(courseData);

    // Step 2: If modules are present, create them with course reference
    let createdModules = [];
    if (Array.isArray(modules) && modules.length > 0) {
      createdModules = await Module.insertMany(
        modules.map(mod => ({
          ...mod,
          course: newCourse._id
        }))
      );

      // Step 3: Update the course with the list of module IDs
      newCourse.modules = createdModules.map(mod => mod._id);
      await newCourse.save();
    }

    res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
      modules: createdModules
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courseData = req.body;

    // Find and update the course
    const updatedCourse = await Course.findByIdAndUpdate(courseId, courseData, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try{
    const courseId = req.params.id;

    // Find and delete the course
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Optionally: delete associated modules (if any)
    await Module.deleteMany({ course: courseId });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ message: "All courses retrieved successfully", courses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course retrieved successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllCoursesByKey = async (req, res) => {
  try{
    const { key, value } = req.params;
    const query = {};
    query[key] = value;

    const courses = await Course.find(query).populate("modules");
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found for the given criteria" });
    }

    res.status(200).json({ message: "Courses retrieved successfully", courses });
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

