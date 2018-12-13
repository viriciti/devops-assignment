module.exports = {
	nats: {
		url: "nats://localhost:4222",
		json: true
	},
	mongodb: {
		hosts: [
			{ host: "localhost", port: 27017 }
		],
		database: "vehicle"
	}
}