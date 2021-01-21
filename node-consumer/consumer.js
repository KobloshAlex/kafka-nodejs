const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "my-consumer",
    brokers: ["127.0.0.1:9092"]
  });

  const consumer = kafka.consumer({ groupId: "payments-mongo-group" });

  const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "payments-debit"});
    await consumer.subscribe({ topic: "payments-credit"});
    await consumer.subscribe({ topic: "payments-cash"});
    

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            topic,
            offset: message.offset,
            value: JSON.parse(message.value),
          });
          const data = JSON.parse(message.value);

          console.log(data.paymentEventId);
        },
      });
  };

  run().catch(console.error);
