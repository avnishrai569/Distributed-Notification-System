const esClient = require("../models/elasticSearchConfig");

exports.indexNotification = async (notification) => {
  try {
    await esClient.index({
      index: "notifications",
      document: {
        userId: notification.userId,
        message: notification.message,
        type: notification.type,
        priority: notification.priority,
        sendTime: notification.sendTime,
      },
    });
    console.log("Notification indexed in Elasticsearch");
  } catch (err) {
    console.error("Error indexing notification:", err.message);
  }
};

exports.searchNotifications = async (query) => {
  try {
    const result = await esClient.search({
      index: "notifications",
      query,
    });
    return result.hits.hits;
  } catch (err) {
    console.error("Error searching notifications:", err.message);
    throw err;
  }
};
