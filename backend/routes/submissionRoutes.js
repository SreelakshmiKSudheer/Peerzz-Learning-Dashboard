const express = require("express");
const submissionRouter = express.Router();
const {
  submitAssignment,
  submitQuiz,
  getSubmissionsByUser,
  getMySubmissions,
  getSubmissionById,
  getSubmissionsByAssignmentId,
  getSubmissionsByQuizId
} = require("../controllers/submissionController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isLearner, isCoordinator, isEducator } = require("../middleware/roleMiddleware");

const allowRoles = (...roles) => (req, res, next) => {
  if (req.user && roles.includes(req.user.role)) return next();
  return res.status(403).json({ message: "Access denied" });
};

// http://localhost:3000/api/submission/assignment/:id
submissionRouter.post("/assignment/:id", verifyToken, isLearner, submitAssignment);

// http://localhost:3000/api/submission/quiz/:id
submissionRouter.post("/quiz/:id", verifyToken, isLearner, submitQuiz);

// http://localhost:3000/api/submission/user/:id
submissionRouter.get("/user/:id", verifyToken, isCoordinator, getSubmissionsByUser);

// http://localhost:3000/api/submission/user/me/submissions
submissionRouter.get("/user/me/submissions", verifyToken, isLearner, getMySubmissions);

// http://localhost:3000/api/submission/:id
submissionRouter.get("/:id", verifyToken, isCoordinator || isEducator, getSubmissionById);

// http://localhost:3000/api/submission/assignment/:id
submissionRouter.get("/assignment/:id", verifyToken, isCoordinator || isEducator, getSubmissionsByAssignmentId);

// http://localhost:3000/api/submission/quiz/:id
submissionRouter.get("/quiz/:id", verifyToken, isCoordinator || isEducator, getSubmissionsByQuizId);

module.exports = submissionRouter;
