const express = require("express");
const userRouter = express.Router();
const { getProfile, approveUser, rejectUser, getAllUsers } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isCoordinator } = require("../middleware/roleMiddleware");

userRouter.get("/me", verifyToken, getProfile); // all roles

userRouter.get("/", verifyToken, isCoordinator, getAllUsers); // coordinator only
userRouter.put("/:id/approve", verifyToken, isCoordinator, approveUser);
userRouter.put("/:id/reject", verifyToken, isCoordinator, rejectUser);

module.exports = userRouter;
