const messages = require("./input.json");

let i = 0;

setInterval(function () {
	i = i >= messages.length - 1 ? 0 : i + 1;
	console.log(JSON.stringify(messages[i]));
}, 2000);
