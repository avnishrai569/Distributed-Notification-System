// const mongoose = require("mongoose");

// const connectMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectMongoDB;
const mongoose = require("mongoose");

const connectMongoDB = async () => {
  // Directly specify the MongoDB URI
  const mongoURI = "mongodb://localhost:27017/notificationDB"; 
  // Replace with your actual URI

  if (!mongoURI) {
    console.error("MongoDB URI is not defined!");
    process.exit(1); // Exit the application if the URI is missing
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
