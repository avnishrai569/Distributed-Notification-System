const { Kafka } = require("kafkajs");
const { kafkaConfig } = require("../config/kafkaConfig");

const kafka = new Kafka(kafkaConfig);
const producer = kafka.producer();

exports.sendToKafka = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
};
