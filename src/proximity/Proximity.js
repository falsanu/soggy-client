const five = require('johnny-five');

class Proximity {

	constructor(options = {}) {
		const that = this;

		this.verbose = options.verbose || false;

		this.currentValue = 0;

		this.minWaterLevel = options.minWaterLevel || process.env.MIN_WATER_LEVEL || 30;
		this.waterTankDepth = options.waterTankDepth || process.env.WATER_TANK_DEPTH || 0;

		this.sensor = new five.Proximity({
			controller: "HCSR04",
			pin: 2
		});

		this.sensor.on("data", function () {
			that.onData(this);

		});

		return this;
	}

	onData(sensor) {
		this.currentValue = sensor.cm * 10;

		this.calculatedValue = this.waterTankDepth - this.currentValue; // höhe des Wassers

		this.percentage = this.calculatedValue * 100 / this.waterTankDepth;

		

		if (this.verbose) {
			console.log(`mm: ${Math.round(this.currentValue)} %: ${Math.round(this.percentage)} waterAboveGround:${Math.round(this.waterAboveGround())} hasWater: ${this.hasWater()}`);
		}
	}

	waterAboveGround() {
		return this.calculatedValue;
	}
	hasWater() {
		return this.calculatedValue > this.minWaterLevel;
	}

}

module.exports = Proximity;
