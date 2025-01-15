const ScheduledNotification = require("../models/scheduledNotificationModel");
const Notification = require("../models/notificationModel");

const scheduleNotifications = async () => {
  try {
    const now = new Date();

    // Find notifications due for delivery
    const dueNotifications = await ScheduledNotification.find({
      sendTime: { $lte: now },
      status: "scheduled",
    });

    for (const notification of dueNotifications) {
      // Move to real-time notifications collection
      await Notification.create({
        userId: notification.userId,
        message: notification.message,
        priority: notification.priority,
        sendTime: notification.sendTime,
        status: "pending",
      });

      // Update status to queued
      notification.status = "queued";
      await notification.save();
    }

    console.log("Scheduled notifications processed:", dueNotifications.length);
  } catch (err) {
    console.error("Error processing scheduled notifications:", err.message);
  }
};

module.exports = scheduleNotifications;
