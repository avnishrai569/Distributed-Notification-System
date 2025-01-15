// const Joi = require("joi");

// const notificationSchema = Joi.object({
//   userId: Joi.string().required(),
//   message: Joi.string().required(),
//   priority: Joi.string().valid("low", "medium", "high").required(),
//   sendTime: Joi.date().optional(),
// });

// exports.validateNotification = (data) => notificationSchema.validate(data);
const Joi = require("joi");

const notificationSchema = Joi.object({
  userId: Joi.string().required(),
  message: Joi.string().required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
  channel: Joi.string().valid("email", "sms", "push").required(), // Add channel validation
  sendTime: Joi.date().optional(),
});

exports.validateNotification = (data) => notificationSchema.validate(data);
