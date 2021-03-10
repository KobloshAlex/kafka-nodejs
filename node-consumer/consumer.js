const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "my-consumer",
	brokers: ["127.0.0.1:9092"],
});

const consumer = kafka.consumer({ groupId: "transfers-group" });

const run = async () => {
	await consumer.connect();
	await consumer.subscribe({ topic: "tsys" });
	await consumer.subscribe({ topic: "internal" });
	await consumer.subscribe({ topic: "afs" });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				topic,
				offset: message.offset,
				value: message.value.toString(),
			});
		},
	});
};

run().catch(console.error);
