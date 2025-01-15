const app = require("./app");

// Load environment variables
require('dotenv').config();
// const dotenv = require("dotenv");
const connectMongoDB = require("./config/mongoConfig");
const scheduleNotifications = require("./services/schedulerService");



// Connect to MongoDB
connectMongoDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Schedule notifications every minute
setInterval(scheduleNotifications, 60 * 1000); // Runs every minute
