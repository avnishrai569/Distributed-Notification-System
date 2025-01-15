const express = require("express");
const { createNotification } = require("../controllers/notificationController");

const {
    handleNotification,
    processNotificationQueue,
    retryFailedNotificationsEndpoint,
  } = require("../controllers/notificationController");



const router = express.Router();

router.post("/notify", createNotification);

router.post('/handle', handleNotification); // Handles incoming notifications
router.post('/process-queue', processNotificationQueue); // Processes notification queue
router.post('/retry-failed', retryFailedNotificationsEndpoint); // Retries failed notifications


module.exports = router;
