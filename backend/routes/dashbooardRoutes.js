const express = require("express");
const dashboardRouter = express.Router();
const { getPublicDashboard, getLearnerDashboard, getEducatorDashboard } = require("../controllers/dashboardController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isLearner, isCoordinator, isEducator } = require("../middleware/roleMiddleware");

// GET /api/dashboard/public
dashboardRouter.get("/public", getPublicDashboard);

// GET /api/dashboard/learner
dashboardRouter.get("/learner", verifyToken, isLearner, getLearnerDashboard);

// GET /api/dashboard/educator
dashboardRouter.get("/educator", verifyToken, isEducator, getEducatorDashboard);




module.exports = dashboardRouter;
