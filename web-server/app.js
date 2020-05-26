const express    = require("express")
const http       = require("http")
const app        = express()
const promClient = require('prom-client');

let server

requestSuccess = new promClient.Counter({
	name: "request_success",
	help: "Number of successful requests"
})

requestFailed = new promClient.Counter({
	name: "request_failed",
	help: "Number of failed requests"
})

app.get("/", (req, res) => {
	res.json({ message: `${new Date} w00t! It's working`})
	requestSuccess.inc(1)
})

app.get("/fail", (req, res) => {
	res.json({ message: `${new Date} Oh! It's not working`})
	requestFailed.inc(1)
})

app.get("/metrics", (req, res) => {
	res.end(promClient.register.metrics());
});

module.exports = {
	start(cb) {
		server = app.listen(3000, () => {
			console.log("HTTP server listening on port 3000")
			cb()
		})
	},
	stop (cb) {
		server.close(cb)
	}
}
