exports.sendPush = async (userId, message) => {
    console.log(`Sending push notification to ${userId}: ${message}`);
    // Simulate push notification delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Push notification sent successfully to ${userId}`);
  };
  