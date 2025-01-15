exports.sendSMS = async (userId, message) => {
    console.log(`Sending SMS to ${userId}: ${message}`);
    // Simulate SMS sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`SMS sent successfully to ${userId}`);
  };
  