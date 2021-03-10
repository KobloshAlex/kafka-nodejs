module.exports = {
	kafka: {
		BROKERS: ["127.0.0.1:9092"],
		CLIENT_ID: "client-id",
		GROUP_ID: "transfers-group",
		TOPICS: {
			AFS: "afs",
			INTERNAL: "internal",
			TSYS: "tsys",
		},
	},
};
