const { sendMessageToKafka } = require("../service/messageService");

const TSYS_TOPIC = "tsys";
const INTERNAL_TOPIC = "internal";
const AFS_TOPIC = "afs";

exports.sendMessage = (req, res) => {
	const paymentMethod = req.body.transferDetails.transferType.toLowerCase();
	const data = req.body;

	console.log(data);

	if (paymentMethod === undefined) {
		throw new Error("Error has been occurred");
	}

	if (paymentMethod === INTERNAL_TOPIC) {
		sendMessageToKafka(data, INTERNAL_TOPIC);
		res.status(200).json({
			status: "SUCCESS",
			message: `Transfer was moved successfully to ${INTERNAL_TOPIC} topic`,
			data,
		});
	} else if (paymentMethod === TSYS_TOPIC) {
		sendMessageToKafka(data, TSYS_TOPIC);
		res.status(200).json({
			status: "SUCCESS",
			message: `Transfer was moved successfully to ${AFS_TOPIC} topic`,
			data,
		});
	} else if (paymentMethod === AFS_TOPIC) {
		sendMessageToKafka(data, AFS_TOPIC);
		res.status(200).json({
			status: "SUCCESS",
			message: `Transfer was moved successfully to ${AFS_TOPIC} topic`,
			data,
		});
	} else {
		return res.status(400).json({
			success: false,
			message: "payment method was not defined",
		});
	}
};
