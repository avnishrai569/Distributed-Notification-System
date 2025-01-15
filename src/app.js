const express = require("express");
const bodyParser = require("body-parser");
const notificationRoutes = require("./routes/notificationRoutes");
const userPreferenceRoutes = require("./routes/userPreferencesRoutes");


// require('dotenv').config();
// const mongoose = require('mongoose');

const app = express();





// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/v1", notificationRoutes);
app.use('/preferences', userPreferenceRoutes);



module.exports = app;




