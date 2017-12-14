const WaterPump = require('../water/WaterPump');
const Hygro = require('../hygro/Hygro');
const Proximity = require('../proximity/Proximity');
const dataLogger = require('../dataLogger/DataLogger');
const mailer = require('../mailer/DataMailer');
const five = require('johnny-five');

class Planty {

	constructor(opts) {
		if(!opts.measureInterval) {
			throw new Error('No measureInterval given');
			process.exit(0);
		}
		this.measureInterval = opts.measureInterval;
		this.wateringTriggerValue = opts.wateringTriggerValue || 700;
		this.wateringTime = opts.wateringTime || 1000;
		this.debugMode = opts.debugMode || false;

		this.board = new five.Board();
	}

	startServer() {
		let that = this;
		this.board.on('ready', function() {

			that.waterPump = new WaterPump({
				wateringTime: that.wateringTime,
				inDebugMode: that.debugMode
			});
			that.hygroMeter = new Hygro();

			that.proximity = new Proximity({verbose:false});


			this.loop(that.measureInterval, ()=>{
				setTimeout(()=>{
					if(!that.hygroMeter.hasPower) {
						console.log('Powering')
						that.hygroMeter.powerOn();
					}
				},100);

				setTimeout(()=> {
					if(that.hygroMeter.hasPower) {
						console.log('Measuring')
						let counter = 0;
						let hygroSum = 0;

						var interval  = setInterval(() => {

							that.hygroMeter.hygro.query((state) => {
								hygroSum += state.value;
								counter++;
							});

							if ( counter == 10 ) { // measure 10 times
								clearInterval(interval);
								const aggregatedHygroValue = hygroSum / 10;
								hygroSum = 0;

								let willWater = false;
								const waterLevel = that.proximity.currentValue;

								if (!that.hasWater()) {
									console.log(`WaterLevel low, will not water: ${that.proximity.percentage}`);
								}
								//
								if (aggregatedHygroValue > that.wateringTriggerValue && that.hasWater()) {
									console.log('Plant needs water');
									mailer.sendStatusMail({'hygroValue':aggregatedHygroValue, 'willWater': willWater, 'waterLevel': that.proximity.percentage});
									that.waterPump.water();
									willWater = true;
								}
								//
								dataLogger.logData(aggregatedHygroValue, willWater, that.proximity.percentage);
								console.log(`Data:: hygro-${aggregatedHygroValue} :: willWater-${willWater} :: waterLevel-${that.proximity.percentage}`);

								if(that.hygroMeter.hasPower) {
									console.log('Switching off')
									that.hygroMeter.powerOff();
								}
							}

						}, 100);

					}
				},500);
			})
		});
	}

	hasWater() {
		return this.proximity.percentage > 20;
	}
}

module.exports = Planty;
