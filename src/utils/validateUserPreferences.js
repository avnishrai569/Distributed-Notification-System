const Joi = require("joi");

const userPreferencesSchema = Joi.object({
  preferredChannels: Joi.array().items(Joi.string().valid("email", "SMS", "push")).min(1),
  quietHours: Joi.object({
    start: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
    end: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  }),
  maxNotificationsPerHour: Joi.number().integer().min(1),
});

exports.validateUserPreferences = (data) => {
  return userPreferencesSchema.validate(data);
};
