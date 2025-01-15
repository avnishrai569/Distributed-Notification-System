const { validateUserPreferences } = require("../utils/validateUserPreferences");
const { getUserPreferences, updateUserPreferences } = require("../services/userPreferencesService");

exports.getPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const preferences = await getUserPreferences(userId);

    if (!preferences) {
      return res.status(404).json({ message: "Preferences not found for the user" });
    }

    res.status(200).json({ preferences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const { error } = validateUserPreferences(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedPreferences = await updateUserPreferences(userId, req.body);
    res.status(200).json({ message: "Preferences updated", data: updatedPreferences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
