const { sendMessageToKafka } = require("../service/messageService");
const config = require("../config/config");

exports.sendMessage = (req, res) => {
	const paymentMethod = req.body.transferDetails.transferType.toLowerCase();
	const data = req.body;

	console.log(data);

	if (paymentMethod === undefined) {
		throw new Error("Error has been occurred");
	}

	if (paymentMethod === config.kafka.TOPICS.INTERNAL) {
		sendMessageToKafka(data, config.kafka.TOPICS.INTERNAL);
		res.status(200).json({
			status: "SUCCESS",
			message: `Transfer was moved successfully to ${config.kafka.TOPICS.INTERNAL} topic`,
			data,
		});
	} else if (paymentMethod === config.kafka.TOPICS.TSYS) {
		sendMessageToKafka(data, config.kafka.TOPICS.TSYS);
		res.status(200).json({
			status: "SUCCESS",
			message: `Transfer was moved successfully to ${config.kafka.TOPICS.TSYS} topic`,
			data,
		});
	} else if (paymentMethod === config.kafka.TOPICS.AFS) {
		sendMessageToKafka(data, config.kafka.TOPICS.AFS);
		res.status(200).json({
			status: "SUCCESS",
			message: `Transfer was moved successfully to ${config.kafka.TOPICS.AFS} topic`,
			data,
		});
	} else {
		return res.status(400).json({
			success: false,
			message: "payment method was not defined",
		});
	}
};
