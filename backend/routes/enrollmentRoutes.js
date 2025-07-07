const enrollmentRouter = require("express").Router();
const {
    enrollUser,
    getMyEnrollments,
    getEnrollmentsByCourse,
    getUserEnrollments,
    updateEnrollmentStatus,
    rejectEnrollment,
    deleteEnrollment
} = require("../controllers/enrollmentController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isLearner,isCoordinator, isEducator } = require("../middleware/roleMiddleware");

// enroll
// http://localhost:3000/api/enrollment/enroll/:courseId
enrollmentRouter.post("/enroll/:courseId", verifyToken, isLearner, enrollUser);

// Get all enrollments for the logged-in user
// http://localhost:3000/api/enrollment/me
enrollmentRouter.get("/me", verifyToken, isLearner, getMyEnrollments);

// Get all enrollments for a specific user (for coordinators)
// http://localhost:3000/api/enrollment/:userId
enrollmentRouter.get("/:userId", verifyToken, isCoordinator, getUserEnrollments); // For coordinators to get enrollments of a specific user

// Get all enrollments for a specific course (for coordinators or educators)
// http://localhost:3000/api/enrollment/course/:courseId
enrollmentRouter.get("/course/:courseId", verifyToken, isCoordinator || isEducator, getEnrollmentsByCourse);

// Update enrollment status (for coordinators or educators)
// http://localhost:3000/api/enrollment/:id/status
enrollmentRouter.put("/:id/status", verifyToken, isCoordinator || isEducator , updateEnrollmentStatus);
enrollmentRouter.put("/:id", verifyToken, isCoordinator, rejectEnrollment);
enrollmentRouter.delete("/:id", verifyToken, isCoordinator, deleteEnrollment);

module.exports = enrollmentRouter;