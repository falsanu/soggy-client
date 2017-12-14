const five = require('johnny-five');
const WaterPump = require('./src/water/WaterPump');
const Hygro = require('./src/hygro/Hygro');
const Proximity = require('./src/proximity/Proximity');

class SelfCheck {

	constructor() {

		this.board = new five.Board();
	}

	checkProximity() {
		let that = this;
		this.board.on('ready', function () {
			that.proximity = new Proximity()
			this.loop(90,()=>{
				console.log(that.proximity.currentValue);
			})
		});
	}

	checkHygro() {
		let that = this;
		this.board.on('ready', function () {

				that.proximity = new Proximity()

				that.hygroMeter = new Hygro();

				this.loop(1000, () => {
						console.log('Start Check');

						if (!that.hygroMeter.hasPower) {
							console.log('Powering')
							that.hygroMeter.powerOn();
						}

						setTimeout(() => {
							if (that.hygroMeter.hasPower) {
								console.log('Measuring')

								that.hygroMeter.hygro.query((state) => {
									console.log('Hygro-Value', state.value);
									if (that.hygroMeter.hasPower) {
										console.log('Switching of')
										that.hygroMeter.powerOff();
									}
								});
							}
						}, 500);
					}
				)
			}
		)
	}

	checkPump() {
		this.board.on('ready', function () {
			var waterPump = new WaterPump({
				wateringTime: 1000,
				inDebugMode: 0
			});
			waterPump.water();
		})
	}

}

let selfCheck = new SelfCheck()


// selfCheck.checkHygro();

selfCheck.checkPump();

// selfCheck.checkProximity()
