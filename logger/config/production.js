module.exports = {
	nats: {
		url: "nats://nats:4222",
		json: true
	},
	mongodb: {
		hosts: [
			{ host: "mongodb-master",    port: 27017 },
			{ host: "mongodb-secondary", port: 27017 },
			{ host: "mongodb-arbiter",   port: 27017 }
		],
		database: "vehicle"
	}
}