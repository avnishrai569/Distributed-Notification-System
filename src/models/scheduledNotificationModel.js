// const mongoose = require("mongoose");

// const scheduledNotificationSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   message: { type: String, required: true },
//   priority: { type: String, enum: ["low", "medium", "high"], required: true },
//   sendTime: { type: Date, required: true },
//   status: { type: String, enum: ["scheduled", "queued"], default: "scheduled" },
// }, { timestamps: true });

// module.exports = mongoose.model("ScheduledNotification", scheduledNotificationSchema);

const mongoose = require("mongoose");

const scheduledNotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  sendTime: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "queued"], default: "scheduled" },
  channel: { 
    type: String, 
    enum: ["email", "SMS", "push"],  // Only these values are allowed
    required: true,  // Ensure that channel is always provided
  },
}, { timestamps: true });

module.exports = mongoose.model("ScheduledNotification", scheduledNotificationSchema);

