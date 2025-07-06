const express = require("express");
const assignmentRouter = express.Router();

const { 
    createAssignment, 
    updateAssignment, 
    deleteAssignment,
    getAssignmentById,
    getAssignmentsByCourse
    } = require("../controllers/assignmentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isEducator, isCoordinator } = require("../middleware/roleMiddleware");

// Protected: Create assignment (educator only)
// http://localhost:3000/api/assignment/create
assignmentRouter.post("/create", verifyToken, isEducator, createAssignment);

// Protected: Update assignment (educator and admin only)
// http://localhost:3000/api/assignment/update/:id
assignmentRouter.put("/update/:id", verifyToken, isEducator || isCoordinator, updateAssignment);

// Protected: Delete assignment (educator and admin only)
// http://localhost:3000/api/assignment/delete/:id
assignmentRouter.delete("/delete/:id", verifyToken, isEducator || isCoordinator, deleteAssignment);

// Public: Get all assignments for a course
// http://localhost:3000/api/assignment/course/:courseId
assignmentRouter.get("/course/:courseId", getAssignmentsByCourse);

// Public: Get assignment by ID
// http://localhost:3000/api/assignment/:id
assignmentRouter.get("/:id", getAssignmentById);

// Export the assignment router
module.exports = assignmentRouter;