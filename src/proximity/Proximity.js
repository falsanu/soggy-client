const five = require('johnny-five');

class Proximity {

	constructor(options = {}) {
		const that = this;

		this.verbose = options.verbose || false;

		this.currentValue = 0;

		this.waterTankDepth = process.env.WATER_TANK_DEPTH || 0;

		this.sensor = new five.Proximity({
			controller: "HCSR04",
			pin: 3
		});

		this.sensor.on("data", function () {
			that.onData(this);

		});

		return this;
	}

	onData(sensor) {
		this.currentValue = sensor.cm;

		this.calculatedValue = this.waterTankDepth - this.currentValue; // höhe des Wassers

		this.percentage = this.calculatedValue * 100 / this.waterTankDepth;

		if (this.verbose) {
			console.log(`cm: ${this.currentValue}`);
			console.log(`%: ${this.percentage}`);
		}
	}

}

module.exports = Proximity;
