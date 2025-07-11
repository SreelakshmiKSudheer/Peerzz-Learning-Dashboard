const Notification = require("../models/Notification");

// Create notification (e.g., on assignment submission or evaluation)
exports.createNotification = async (req, res) => {
  try {
    const { user, title, message, type } = req.body;
    const notification = await Notification.create({ user, title, message, type });
    res.status(201).json({ message: "Notification sent", notification });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get notifications for a user
exports.getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.status(200).json({ message: "Notification marked as read", notification: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
