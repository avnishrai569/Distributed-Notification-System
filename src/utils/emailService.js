exports.sendEmail = async (userId, message) => {
    console.log(`Sending email to ${userId}: ${message}`);
    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Email sent successfully to ${userId}`);
  };
  