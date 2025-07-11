const express = require("express");
const notificationRouter = express.Router();
const { createNotification, getNotificationsByUser, markAsRead } = require("../controllers/notificationController");
const { verifyToken } = require("../middleware/authMiddleware");

notificationRouter.post("/create", verifyToken, createNotification);
notificationRouter.get("/user/:userId", verifyToken, getNotificationsByUser);
notificationRouter.put("/read/:id", verifyToken, markAsRead);

module.exports = notificationRouter;
