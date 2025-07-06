const express = require("express");
const courseRouter = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllCoursesByKey,
} = require("../controllers/courseController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isLearner, isEducator, isCoordinator } = require("../middleware/roleMiddleware");

// Protected: Create course (educator only)
// http://localhost:3000/api/course/create
courseRouter.post("/create", verifyToken, isEducator, createCourse);

// Protected: Update course (educator or coordinator)
// http://localhost:3000/api/course/update/:id
courseRouter.put("/update/:id", verifyToken, (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const role = req.user.role;
  if (role === "educator" || role === "coordinator") return next();
  return res.status(403).json({ message: "Access denied" });
}, updateCourse);

// Protected: Delete course (educator or coordinator)
// http://localhost:3000/api/course/:id
courseRouter.delete("/:id", verifyToken, (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const role = req.user.role;
  if (role === "educator" || role === "coordinator") return next();
  return res.status(403).json({ message: "Access denied" });
}, deleteCourse);


// Public: Get all courses
// http://localhost:3000/api/course
courseRouter.get("/", getAllCourses);

// Public: Get course by ID
// http://localhost:3000/api/course/:id
courseRouter.get("/:id", getCourseById);

// Public: Get all courses by some condition (e.g., by category, institution, etc.)
// http://localhost:3000/api/course/:key/:value
courseRouter.get("/:key/:value", getAllCoursesByKey);

module.exports = courseRouter;
