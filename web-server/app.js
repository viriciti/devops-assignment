const express       = require("express")
const http          = require("http")
const config        = require("config")
const WebSocket     = require("ws")

const NATS = require("nats")

const nats = NATS.connect(config.nats)

const app = express()

// Create own HTTP server instead of using app.listen() in order to share the same port with WS
const httpServer = http.createServer(app)

// Initating all middleware for express
app
	.set("views", `${process.cwd()}/src/server/views`)
	.set("view engine", "pug")
	.use(express.static(`${process.cwd()}/src/client`))

// Render index.pug from views for root URL
app
	.get("/", (req, res) => {
		res.render("index")
	})

// Initiate websocket server with the same server as express
const wss = new WebSocket.Server({ server: httpServer })

wss.on("connection", (socket) => {
	const subId = nats.subscribe("vehicle.*", (message, _, topic) => {
		message.vehicle = topic.split(".")[1]

		try {
			socket.send(JSON.stringify(message))
		}
		catch (e) {
			console.error(`Socket not ready!, ${e.message}`)
		}
	})
	socket.once("close", () => {
		nats.unsubscribe(subId)
	})
})

// Start listening on port 3000 for both express app and WS server
httpServer.listen(3000, () => {
	console.log("HTTP server listening on port 3000")
})


