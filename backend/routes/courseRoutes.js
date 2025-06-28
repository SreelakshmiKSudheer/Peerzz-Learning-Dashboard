const express = require("express");
const courseRouter = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isEducator, isCoordinator } = require("../middleware/roleMiddleware");

// Public: Get all courses
courseRouter.get("/", getAllCourses);

// Public: Get course by ID
courseRouter.get("/:id", getCourseById);

// Protected: Create course (educator only)
courseRouter.post("/create", verifyToken, isEducator, createCourse);

// Protected: Update course (educator or coordinator)
courseRouter.put("/:id", verifyToken, (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const role = req.user.role;
  if (role === "educator" || role === "coordinator") return next();
  return res.status(403).json({ message: "Access denied" });
}, updateCourse);

// Protected: Delete course (educator or coordinator)
courseRouter.delete("/:id", verifyToken, (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const role = req.user.role;
  if (role === "educator" || role === "coordinator") return next();
  return res.status(403).json({ message: "Access denied" });
}, deleteCourse);

module.exports = courseRouter;
