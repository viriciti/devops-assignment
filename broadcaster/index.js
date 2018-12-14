
/*

In this file you will find how we send raw data to other services via nats
There are 2 question points for you to tell us the answer on your presentation
If you're up for it

*/
const async         = require("async")
const csvParse      = require("csv-parse")
const fs            = require("fs")
const config        = require("config")
const Writable      = require("stream").Writable

// NATS Server is a simple, high performance open source messaging system
// for cloud native applications, IoT messaging, and microservices architectures.
// https://nats.io/
// It acts as our pub-sub (https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
// mechanism for other service that needs raw data
const NATS = require("nats")

// At this point, do not forget to run NATS server!

// NATS connection happens here
// After a connection is made you can start broadcasting messages (take a look at nats.publish())
const nats = NATS.connect(config.nats)

// This function will start reading out csv data from file and publish it on nats
const readOutLoud = (vehicleName) => {
	// Read out meta/route.csv and turn it into readable stream
	const fileStream = fs.createReadStream(`${__dirname}/route.csv`)

	// Now comes the interesting part,
	// Handling this filestream requires us to create pipeline that will transform the raw string
	// to object and sent out to nats
	// The pipeline should looks like this
	//
	//  File -> parse each line to object -> published to nats
	//

	let i = 0

	return (fileStream
		// Filestream piped to csvParse which accept nodejs readablestreams and parses each line to a JSON object
		.pipe(csvParse({ delimiter: ",", columns: true, cast: true }))
		// Then it is piped to a writable streams that will push it into nats
		.pipe(new Writable({
			objectMode: true,
			write(obj, enc, cb) {
				// setTimeout in this case is there to emulate real life situation
				// data that came out of the vehicle came in with irregular interval
				// Hence the Math.random() on the second parameter
				setTimeout(() => {

					i++
					if((i % 100) === 0)
						console.log(`vehicle ${vehicleName} sent have sent ${i} messages`)

					// The first parameter on this function is topics in which data will be broadcasted
					// it also includes the vehicle name to seggregate data between different vehicle

					nats.publish(`vehicle.${vehicleName}`, obj, cb)

				}, Math.random() * 1000)
			}
		})))
}

const busName = process.env.BUS_NAME ? process.env.BUS_NAME : "test-bus-1"

// This next few lines simulate Henk's (our favorite driver) shift
async.forever((cb) => {
	console.log(`Henk checks in on ${busName} starting his shift...`)
	readOutLoud(busName)
		.once("finish", () => {
			console.log("henk is on the last stop and he is taking a cigarrete while waiting for his next trip")
			cb()
		})
})
// To make your presentation interesting maybe you can make henk drive again in reverse
