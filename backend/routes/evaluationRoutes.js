const express = require("express");
const evaluationRouter = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { evaluateSubmission, getEvaluation } = require("../controllers/evaluationController");
const { isEducator, isCoordinator} = require("../middleware/roleMiddleware")


// Only educators/coordinators should have access in production; add middleware if needed
// http://localhost:3000/api/evaluation/:submissionId
evaluationRouter.post("/:submissionId", verifyToken, isEducator, evaluateSubmission);
// http://localhost:3000/api/evaluation/:submissionId
evaluationRouter.get("/:submissionId", verifyToken, isEducator || isCoordinator, getEvaluation);

module.exports = evaluationRouter;
