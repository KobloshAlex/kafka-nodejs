const messages = require("./input.json");
const { sendMessageToKafka } = require("./service/messageService");
const config = require("./config/config");

let i = 0;
setInterval(function () {
	i = i >= messages.length - 1 ? 0 : i + 1;
	const message = messages[i];
	const transferType = message.transferDetails.transferType.toLowerCase();
	console.log(transferType);
	if (transferType === config.kafka.TOPICS.TSYS) {
		sendMessageToKafka(message, config.kafka.TOPICS.TSYS);
	} else if (transferType === config.kafka.TOPICS.INTERNAL) {
		sendMessageToKafka(message, config.kafka.TOPICS.INTERNAL);
	} else if (transferType === config.kafka.TOPICS.AFS) {
		sendMessageToKafka(message, config.kafka.TOPICS.AFS);
	}
}, 1000);
