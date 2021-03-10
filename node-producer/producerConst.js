const messages = require("./input.json");
const { sendMessageToKafka } = require("./service/messageService");

const TSYS_TOPIC = "tsys";
const INTERNAL_TOPIC = "internal";
const AFS_TOPIC = "afs";


let i = 0;
setInterval(function () {
	i = i >= messages.length - 1 ? 0 : i + 1;
	const message = messages[i];
	const transferType = message.transferDetails.transferType.toLowerCase();
	console.log(transferType);
	if (transferType === TSYS_TOPIC) {
		sendMessageToKafka(message, TSYS_TOPIC);
	} else if (transferType === INTERNAL_TOPIC) {
		sendMessageToKafka(message, INTERNAL_TOPIC);
	} else if (transferType === AFS_TOPIC) {
		sendMessageToKafka(message, AFS_TOPIC);
	}
}, 1000);
