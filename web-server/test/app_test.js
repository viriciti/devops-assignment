const app = require('../app')
const request = require('request')
const { expect } = require('request')

describe('the test', function() {
	it('should start', function(done) {
		app.start(done)
	})

	it('should should respond', function(done) {
		const req = {
			json: true,
			uri: 'http://localhost:8080/',
		}

		request.get(req, (error, res, body) => {
			if (error) return done(error)
			if (res.statusCode !== 200) return done(new Error(`oh no! ${res.statusCode}`))
			console.log('body', body)
			done()
		})
		
	})

	it('should stop', function(done) {
		app.stop(done)
	})
})
