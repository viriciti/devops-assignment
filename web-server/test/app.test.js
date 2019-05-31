const { expect } = chai = require("chai")

chai.use(require("chai-http"))

const server = require("../src/server/server")

describe("Webserver test", () => {
	it("should start server", (done) => {
		server.start(done)
	})

	it("should listen on 3000", () => {
		return chai.request("http://localhost:3000")
			.get("/")
			.then((res) => {
				expect(res).to.have.status(200)
				expect(res).to.be.a.html
			})
	})

	it("should have an app.js", () => {
		return chai.request("http://localhost:3000")
			.get("/app.js")
			.then((res) => {
				expect(res).to.have.status(200)
			})
	})

	it("should fail when we need it", () => {
		if(process.env.THROW_ME) {
			throw new Error("BAAAA! Somebody will loose their finger")
		}
	})

	it("should stop server", (done) => {
		server.stop(done)
	})
})