const mongoose    = require("mongoose")
const NATS        = require("nats")
const mongoFormat = require("mongodb-uri")
const config      = require("config")

const mongodbUrl = mongoFormat.format(config.mongodb)

mongoose.connect(mongodbUrl, { useNewUrlParser: true })

const Data = mongoose.model("Data", {
	vehicle: String,
	time:    Date,
	gps:     String,
	energy:  Number,
	odo:     Number,
	speed:   Number,
	soc:     Number
})

const nats = NATS.connect(config.nats)

console.log("start listening to vehicle *")

let i = 0

nats.subscribe("vehicle.*", (message, _, topic) => {
	const data = new Data({ ...message, vehicle: topic.split(".")[1] })
	data.save()
	i++
	console.log(`Saved ${i} data point`)
})