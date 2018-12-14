const app = new Vue({
	el: "#app",
	data: {
		vehicles: []
	},
	mounted() {
		const ws = new WebSocket(`ws://${window.location.host}`)

		ws.onmessage = this.handleWsMessage
	},
	methods: {
		handleWsMessage(message) {
			let data;

			try {
				data = JSON.parse(message.data)
			} catch (e) {
				console.error("Broken message", e.message)
			}

			const vehicle = this.vehicles.find((item) => {
				return item.vehicle === data.vehicle
			})

			if(!vehicle) {
				this.vehicles.push(data)
			} else {
				Object.assign(vehicle, data)
			}

		}
	}
});
