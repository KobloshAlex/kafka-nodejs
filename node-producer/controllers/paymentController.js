const e = require("express");
const {sendMessageToKafka} = require("../producer");
exports.sendMessage = (req, res, next) => {

    const paymentMethod = req.body.payment.paymentMethod.toUpperCase();
    const data = req.body;
    console.log(paymentMethod);

    if(paymentMethod === "DEBIT") {
        sendMessageToKafka(data, "payments-debit");
        res.status(200).json(data);
    } else if (paymentMethod === "CASH") {
        sendMessageToKafka(data, "payments-cash");
        res.status(200).json(data);
    } else if (paymentMethod === "CREDIT") {
        sendMessageToKafka(data, "payments-credit");
        res.status(200).json(data);
    } else {
        res.status(400).json({
            success: false,
            message: "payment method was not defined"
        });
        console.log("payment method was not defined");
    }
};