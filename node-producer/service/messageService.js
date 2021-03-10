const { Kafka } = require("kafkajs");
const config = require("../config/config");


exports.sendMessageToKafka = (message, topic) => {
	const kafka = new Kafka({
		clientId: config.kafka.CLIENT_ID, // optional for logging ID
		brokers: config.kafka.BROKERS, // broker server ["127.0.0.1:9092", "127.0.0.1:9093", "127.0.0.1:9094"]
	});

	const producer = kafka.producer(); // create producer API

	const run = async () => {
		await producer.connect(); // connect to kafka broker
    // take massage and send as JSON
		await producer.send({
			topic,
			messages: [{ value: JSON.stringify(message) }],
		});
	};

	producer.disconnect();

	run().catch(console.error);
};
