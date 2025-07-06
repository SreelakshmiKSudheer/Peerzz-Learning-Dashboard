const express = require("express");
const userRouter = express.Router();
const { getProfile, rejectUser, getAllUsers } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isCoordinator } = require("../middleware/roleMiddleware");

// http://localhost:3000/api/user/me
userRouter.get("/me", verifyToken, getProfile); // all roles

// http://localhost:3000/api/user
userRouter.get("/", verifyToken, isCoordinator, getAllUsers); // coordinator only

// http://localhost:3000/api/user/:id/reject
userRouter.put("/:id/reject", verifyToken, isCoordinator, rejectUser);
module.exports = userRouter;
