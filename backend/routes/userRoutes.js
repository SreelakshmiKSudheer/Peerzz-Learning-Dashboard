const express = require("express");
const userRouter = express.Router();
const { getProfile, 
    rejectUser, 
    getAllUsers,
    getUserByRole,
    getUserByStatus,
    getUsersByCourse,
    deleteUser
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isCoordinator } = require("../middleware/roleMiddleware");

// http://localhost:3000/api/user/me
userRouter.get("/me", verifyToken, getProfile); // all roles

// http://localhost:3000/api/user
userRouter.get("/", verifyToken, isCoordinator, getAllUsers); // coordinator only

// http://localhost:3000/api/user/:id/reject
userRouter.put("/:id/reject", verifyToken, isCoordinator, rejectUser);

// http://localhost:3000/api/user/role/:role
userRouter.get("/role/:role", verifyToken, isCoordinator, getUserByRole);

// http://localhost:3000/api/user/status/:status
userRouter.get("/status/:status", verifyToken, isCoordinator, getUserByStatus);

// http://localhost:3000/api/user/:id
userRouter.delete("/:id", verifyToken, isCoordinator, deleteUser);

module.exports = userRouter;
