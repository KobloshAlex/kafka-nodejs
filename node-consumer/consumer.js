const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "my-consumer",
    brokers: ["127.0.0.1:9092"]
  });

  const consumer = kafka.consumer({ groupId: "payments-group" });

  const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "payments-debit", fromBeginning: true });
    await consumer.subscribe({ topic: "payments-credit", fromBeginning: true });
    await consumer.subscribe({ topic: "payments-cash", fromBeginning: true});
    

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
