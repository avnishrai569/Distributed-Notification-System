const { validateNotification } = require("../utils/validateNotification");
const { processNotification } = require("../services/notificationService");
const { throttleNotification, filterQuietHours, deduplicateNotification } = require("../services/notificationQueryService");
const { deliverNotification, retryFailedNotifications } = require("../services/notificationDeliveryService");

const userPreferencesSchema  = require("../models/userPreferencesModel");
const Notification = require("../models/notificationModel");


// exports.createNotification = async (req, res) => {
//   try {
//     const notification = req.body;

//     // Validate the notification data
//     const { error } = validateNotification(notification);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     // Process notification
//     const savedNotification = await processNotification(notification);

//     res.status(200).json({ message: "Notification processed", data: savedNotification });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
exports.createNotification = async (req, res) => {
  try {
    const notification = req.body;

    // Validate the notification data
    const { error } = validateNotification(notification);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Process notification
    const savedNotification = await processNotification(notification);

    res.status(200).json({ message: "Notification processed", data: savedNotification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.handleNotification = async (req, res) => {
//   const { userId, message, priority } = req.body;
//   console.log("BEFORE", userPreferencesSchema);
//   const userPreferences = await userPreferencesSchema.findOne({ userId });
//   console.log("AFTER", userPreferences);

//   if (!userPreferences) {
//     return res.status(404).json({ error: "User preferences not found." });
//   }

//   const canSend = await throttleNotification(userId, userPreferences.maxNotificationsPerHour)
//     && await filterQuietHours(req.body, userPreferences)
//     && await deduplicateNotification(req.body);

//   if (canSend) {
//     // Proceed to send notification
//     res.status(200).json({ message: "Notification sent successfully." });
//   } else {
//     res.status(200).json({ message: "Notification deferred or suppressed." });
//   }
// };

// const UserPreferences = require('../models/userPreferences');  // Import the UserPreferences model

exports.handleNotification = async (req, res) => {
  const { userId, message, priority, channel } = req.body;

  try {
    // Retrieve user preferences based on userId
    const userPreferences = await userPreferencesSchema.findOne({ userId });

    if (!userPreferences) {
      return res.status(404).json({ error: "User preferences not found." });
    }

    // Now we need to check if the notification can be sent based on throttling, quiet hours, and deduplication
    const canSend = await throttleNotification(userId, userPreferences.maxNotificationsPerHour)
      && await filterQuietHours(req.body, userPreferences)
      && await deduplicateNotification(req.body);

    if (canSend) {
      // Proceed to send notification
      res.status(200).json({ message: "Notification sent successfully." });
    } else {
      res.status(200).json({ message: "Notification deferred or suppressed." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.processNotificationQueue = async (req, res) => {
  const notifications = await Notification.find({ status: "pending" });

  for (const notification of notifications) {
    console.log(`Processing notification ${notification._id}...`);
    await deliverNotification(notification);
  }

  res.status(200).json({ message: "Notification queue processed." });
};

exports.retryFailedNotificationsEndpoint = async (req, res) => {
  await retryFailedNotifications();
  res.status(200).json({ message: "Retried failed notifications." });
};

