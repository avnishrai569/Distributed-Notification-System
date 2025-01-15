const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  channel :{type: String, required: true},
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  sendTime: { type: Date, default: null },
  status: { type: String, enum: ["pending", "sent","failed","rescheduled"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
