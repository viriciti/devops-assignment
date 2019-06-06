const express = require("express")
const http    = require("http")
const app     = express()

let server

app.get("/", (req, res) => {
	res.json({ message: `${new Date} w00t! It's working`})
})

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
