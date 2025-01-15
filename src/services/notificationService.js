const Notification = require("../models/notificationModel");
const ScheduledNotification = require("../models/scheduledNotificationModel");

// exports.processNotification = async (notification) => {
//   if (!notification.sendTime || notification.priority === "high") {
//     // Real-time processing
//     return await Notification.create({
//       userId: notification.userId,
//       message: notification.message,
//       priority: notification.priority,
//       status: "pending",
//     });
//   } else {
//     // Schedule for later
//     return await ScheduledNotification.create({
//       userId: notification.userId,
//       message: notification.message,
//       priority: notification.priority,
//       sendTime: new Date(notification.sendTime),
//     });
//   }
// };

// exports.processNotification = async (notification) => {
//   if (!notification.sendTime || notification.priority === "high") {
//     // Real-time processing: Include channel in the Notification
//     return await Notification.create({
//       userId: notification.userId,
//       message: notification.message,
//       priority: notification.priority,
//       status: "pending",
//       channel: notification.channel,  // Make sure the channel is passed here
//     });
//   } else {
//     // Scheduled for later: Include channel in the ScheduledNotification
//     return await ScheduledNotification.create({
//       userId: notification.userId,
//       message: notification.message,
//       priority: notification.priority,
//       sendTime: new Date(notification.sendTime),
//       channel: notification.channel,  // Make sure the channel is passed here
//     });
//   }
// };



exports.processNotification = async (notification) => {
  if (!notification.sendTime || notification.priority === "high") {
    // Real-time processing: Include channel in the Notification
    const createdNotification = await Notification.create({
      userId: notification.userId,
      message: notification.message,
      priority: notification.priority,
      status: "pending",  // Initial status of the notification
      channel: notification.channel,  // Ensure the channel is passed here
    });

    return createdNotification;  // Return the created notification
  } else {
    // Scheduled for later: Include channel in the ScheduledNotification
    const createdScheduledNotification = await ScheduledNotification.create({
      userId: notification.userId,
      message: notification.message,
      priority: notification.priority,
      sendTime: new Date(notification.sendTime),  // Ensure sendTime is a valid date
      channel: notification.channel,  // Ensure the channel is passed here
    });

    return createdScheduledNotification;  // Return the created scheduled notification
  }
};

exports.isWithinQuietHours = (currentHour, quietHours) => {
    const [startHour] = quietHours.start.split(":").map(Number);
    const [endHour] = quietHours.end.split(":").map(Number);
  
    if (startHour < endHour) {
      return currentHour >= startHour && currentHour < endHour;
    } else {
      // Handles overnight quiet hours (e.g., 10 PM to 8 AM)
      return currentHour >= startHour || currentHour < endHour;
    }
  };
  
  exports.filterQuietHours = async (notification, userPreferences) => {
    const currentHour = new Date().getHours();
    const isQuiet = this.isWithinQuietHours(currentHour, userPreferences.quietHours);
  
    if (isQuiet) {
      const nextActiveTime = new Date();
      nextActiveTime.setHours(userPreferences.quietHours.end.split(":")[0]);
      nextActiveTime.setMinutes(0);
  
      notification.sendTime = nextActiveTime;
      notification.status = "rescheduled";
      await notification.save();
  
      console.log(`Notification rescheduled for ${notification.userId} to ${nextActiveTime}.`);
      return false;
    }
  
    return true; // Notification can be sent
  };
  
