const Notification = require("../models/notificationModel");
const emailService = require("../utils/emailService");
const smsService = require("../utils/smsService");
const pushService = require("../utils/pushService");

exports.deliverNotification = async (notification) => {
  const { userId, channel, message } = notification;
  let deliveryStatus = "failed";

  try {
    if (channel === "email") {
      await emailService.sendEmail(userId, message);
    } else if (channel === "sms") {
      await smsService.sendSMS(userId, message);
    } else if (channel === "push") {
      await pushService.sendPush(userId, message);
    } else {
      throw new Error(`Unsupported channel: ${channel}`);
    }

    deliveryStatus = "sent";
  } catch (error) {
    console.error(`Delivery failed for notification ${notification._id}: ${error.message}`);
  }

  // Update the notification status in MongoDB
  notification.status = deliveryStatus;
  notification.sentAt = new Date();
  await notification.save();

  return deliveryStatus;
};

exports.retryFailedNotifications = async () => {
  const failedNotifications = await Notification.find({ status: "failed" });

  for (const notification of failedNotifications) {
    console.log(`Retrying notification ${notification._id}...`);
    await this.deliverNotification(notification);
  }
};
