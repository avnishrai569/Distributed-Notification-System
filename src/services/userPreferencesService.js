const UserPreferences = require("../models/userPreferencesModel");

exports.getUserPreferences = async (userId) => {
  return await UserPreferences.findOne({ userId });
};

exports.updateUserPreferences = async (userId, preferences) => {
  return await UserPreferences.findOneAndUpdate(
    { userId },
    preferences,
    { new: true, upsert: true } // Create a document if none exists
  );
};
