const { Kafka } = require("kafkajs");

exports.sendMessageToKafka = (message, topic) => {
	const kafka = new Kafka({
		clientId: "my-producer",
		brokers: ["127.0.0.1:9092"],
	});

	const producer = kafka.producer();

	const run = async () => {
		await producer.connect();
		await producer.send({
			topic,
			messages: [{ value: JSON.stringify(message) }],
		});
	};

	producer.disconnect();

	run().catch(console.error);
};
