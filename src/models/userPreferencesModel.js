// const mongoose = require("mongoose");

// const userPreferencesSchema = new mongoose.Schema({
//   userId: { type: String, required: true, unique: true },
//   preferredChannels: { type: [String], enum: ["email", "SMS", "push"], default: ["email"] },
//   quietHours: {
//     start: { type: String, default: "22:00" }, // Quiet hours start time in HH:mm
//     end: { type: String, default: "08:00" },  // Quiet hours end time in HH:mm
//   },
//   maxNotificationsPerHour: { type: Number, default: 3}, // Throttling limit
// }, { timestamps: true });

// module.exports = mongoose.model("UserPreferences", userPreferencesSchema);

const mongoose = require("mongoose");

const userPreferencesSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  preferredChannels: { 
    type: [String], 
    enum: ["email", "SMS", "push"], 
    default: ["email"] 
  },
  quietHours: {
    start: { type: String, default: "22:00" }, // Quiet hours start time in HH:mm
    end: { type: String, default: "08:00" },  // Quiet hours end time in HH:mm
  },
  maxNotificationsPerHour: { type: Number, default: 3 }, // Throttling limit
}, { timestamps: true });

module.exports = mongoose.model("UserPreferences", userPreferencesSchema);
