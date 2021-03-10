const { Kafka } = require("kafkajs");
const config = require("./config/config");

const kafka = new Kafka({
	clientId: config.kafka.CLIENT_ID, // optional for logging ID
	brokers: config.kafka.BROKERS, // broker server ["127.0.0.1:9092", "127.0.0.1:9093", "127.0.0.1:9094"]
});
// create consumer API with consumer group ID
const consumer = kafka.consumer({ groupId: config.kafka.GROUP_ID });

const run = async () => {
	// connect to Kafka Broker and subscribe to the following topics : tsys, internal, afs
	await consumer.connect();
	await consumer.subscribe({ topic: config.kafka.TOPICS.AFS });
	await consumer.subscribe({ topic: config.kafka.TOPICS.INTERNAL });
	await consumer.subscribe({ topic: config.kafka.TOPICS.TSYS });

	// fetch each message and log to console
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

// catch error if any
run().catch(console.error);
