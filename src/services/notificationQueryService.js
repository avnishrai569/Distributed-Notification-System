const Notification = require("../models/notificationModel");
const mongoose = require('mongoose');

exports.isWithinThrottleLimit = async (userId) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const notificationCount = await Notification.countDocuments({
    userId,
    sentAt: { $gte: oneHourAgo },
  });

  return notificationCount;
};

exports.throttleNotification = async (userId, maxLimit) => {
  const notificationCount = await this.isWithinThrottleLimit(userId);

  if (notificationCount >= maxLimit) {
    console.log(`Throttle limit reached for user ${userId}. Deferring notification.`);
    return false;
  }

  return true; // Notification can be sent
};
exports.isDuplicateNotification = async (userId, message) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const duplicate = await Notification.findOne({
    userId,
    message,
    sentAt: { $gte: oneHourAgo },
  });

  return !!duplicate; // Return true if a duplicate is found
};

exports.deduplicateNotification = async (notification) => {
  const isDuplicate = await this.isDuplicateNotification(notification.userId, notification.message);

  if (isDuplicate) {
    console.log(`Duplicate notification detected for user ${notification.userId}. Suppressing.`);
    return false;
  }

  return true; // Notification can be sent
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
  
  // exports.filterQuietHours = async (notification, userPreferences) => {
  //   const currentHour = new Date().getHours();
  //   const isQuiet = this.isWithinQuietHours(currentHour, userPreferences.quietHours);
  
  //   if (isQuiet) {
  //     const nextActiveTime = new Date();
  //     nextActiveTime.setHours(userPreferences.quietHours.end.split(":")[0]);
  //     nextActiveTime.setMinutes(0);
  
  //     notification.sendTime = nextActiveTime;
  //     notification.status = "rescheduled";
  //     await notification.save();
  
  //     console.log(`Notification rescheduled for ${notification.userId} to ${nextActiveTime}.`);
  //     return false;
  //   }
  
  //   return true; // Notification can be sent
  // };

  // exports.filterQuietHours = async (notification, userPreferences) => {
  //   const currentHour = new Date().getHours();
  //   const isQuiet = this.isWithinQuietHours(currentHour, userPreferences.quietHours);
  
  //   if (isQuiet) {
  //     const nextActiveTime = new Date();
  //     const quietEndHour = parseInt(userPreferences.quietHours.end.split(":")[0], 10);
  //     nextActiveTime.setHours(quietEndHour);
  //     nextActiveTime.setMinutes(0);  // Reset minutes to 00:00
  
  //     // Check if notification is a Mongoose document
  //     if (notification instanceof mongoose.Document) {
  //       // If it is a Mongoose document, you can safely call .save()
  //       notification.sendTime = nextActiveTime;
  //       notification.status = "rescheduled";
  //       await notification.save();
  
  //       console.log(`Notification for user ${notification.userId} has been rescheduled to ${nextActiveTime}.`);
  //     } else {
  //       console.error("Notification is not a Mongoose document.");
  //     }
  
  //     return false; // Notification should not be sent during quiet hours
  //   }
  
  //   return true; // Notification can be sent if it's outside quiet hours
  // };


  exports.filterQuietHours = async (notification, userPreferences) => {
    const currentHour = new Date().getHours();
    const isQuiet = this.isWithinQuietHours(currentHour, userPreferences.quietHours);
  
    if (isQuiet) {
      const nextActiveTime = new Date();
      const quietEndHour = parseInt(userPreferences.quietHours.end.split(":")[0], 10);
      nextActiveTime.setHours(quietEndHour);
      nextActiveTime.setMinutes(0);  // Reset minutes to 00:00
  
      // If the notification is a plain object, convert it to a Mongoose document
      if (!(notification instanceof mongoose.Document)) {
        notification = new Notification(notification); 
      }
  
      // Now, we can save it as a Mongoose document
      notification.sendTime = nextActiveTime;
      notification.status = "rescheduled";
      await notification.save(); // Save the document in the database
  
      console.log(`Notification for user ${notification.userId} has been rescheduled to ${nextActiveTime}.`);
  
      return false; // Notification should not be sent during quiet hours
    }
  
    return true; // Notification can be sent if it's outside quiet hours
  };
   
  
  exports.aggregateLowPriorityNotifications = async () => {
    const currentHour = new Date().getHours();
  
    const notifications = await Notification.find({
      priority: "low",
      sendTime: {
        $gte: new Date(new Date().setHours(currentHour, 0, 0)),
        $lt: new Date(new Date().setHours(currentHour + 1, 0, 0)),
      },
    });
  
    if (notifications.length > 0) {
      const summaryMessage = notifications.map((n) => n.message).join("\n");
      const summaryNotification = new Notification({
        userId: notifications[0].userId, // Assuming same user
        message: `Summary:\n${summaryMessage}`,
        priority: "low",
        sendTime: new Date(),
      });
  
      await summaryNotification.save();
      console.log("Low-priority notifications aggregated into a summary.");
    }
  };
  exports.processUrgentNotifications = async () => {
    const urgentNotifications = await Notification.find({ priority: "high" });
  
    for (const notification of urgentNotifications) {
      // Immediately send to the delivery queue
      notification.status = "sent";
      notification.sentAt = new Date();
      await notification.save();
  
      console.log(`Urgent notification sent for user ${notification.userId}.`);
    }
  };
  
  
  


