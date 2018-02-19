const five = require('johnny-five');
const WaterPump = require('./src/water/WaterPump');
const Hygro = require('./src/hygro/Hygro');
const Proximity = require('./src/proximity/Proximity');
const DataMailer = require('./src/mailer/DataMailer');

const options = {
	debugMode: process.env.DEBUG || 0,
	wateringTriggerValue: process.env.WATERING_TRIGGER_VALUE || 800,
	wateringTime: process.env.WATERING_TIME || 1000,
	measureInterval: process.env.MEASURE_INTERVAL || 2000
}

class SelfCheck {

	constructor() {

		let that = this;
		this.board = new five.Board();
		this.proximity = null;
		this.hygroMeter = null;
		this.hygroValue = 0;
		
		this.mailer = new DataMailer({isActive:true})
		setTimeout(() => {
			this.checkMailer();	
		}, 5000);
		

		this.board.on('ready', function () {

			that.waterPump = new WaterPump({
				wateringTime: 5000,
				inDebugMode: 0
			});
			that.hygroMeter = new Hygro();
			that.hygroMeter.powerOn();

			that.proximity = new Proximity({waterTankDepth:150, minWaterLevel:40});


			that.display='water';
			that.displayCounter = 0;
			this.loop(90,()=>{

				if(that.display == 'water') {
					// that.waterPump.water();
					that.display = 'proximity';
					that.proximity.verbose=true;
				}


				if(that.display == 'proximity') {
					that.displayCounter++
					if(that.displayCounter == 10) {
						that.display = 'hygro';
						that.displayCounter = 0;
						that.proximity.verbose=true;
					}

				}

				if(that.display == 'hygro') {
					that.hygroMeter.measure();
					console.log(`HygroValue: ${that.hygroMeter.currentValue}`)
					that.displayCounter++
					// that.hygroMeter.hygro.query((state) => {
					// 	that.hygroValue = state.value;
					// 	console.log(`HygroValue: ${state.value}`)
					// 	that.displayCounter++
					// });
					if(that.displayCounter == 10) {
						that.display = 'proximity';
						that.displayCounter = 0;
					}
				}
			})
			// that.run().bind(that)
		});
	}

	checkProximity() {
		let that = this;
		this.board.on('ready', function () {
			that.proximity = new Proximity()
			this.loop(90, () => {
				console.log(that.proximity.currentValue);

			})
		});
	}

	checkHygro() {
		let that = this;
		this.board.on('ready', function () {

				that.hygroMeter = new Hygro();
				that.hygroMeter.powerOn();

				this.loop(1000, () => {
						console.log('Start Check');

						that.hygroMeter.hygro.query((state) => {
							that.hygroValue = state.value;
							console.log('Hygro-Value', state.value);
						});

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

	checkMailer() {

		this.mailer.sendStatusMail({
			hygroValue: this.hygroMeter.currentValue,
			willWater: false,
			waterLevel: this.proximity.percentage,
			waterAboveGround: this.proximity.waterAboveGround(),
			hasWater:this.proximity.hasWater()
		});

	}
}

let selfCheck = new SelfCheck()

// selfCheck.checkHygro();

// selfCheck.checkPump();

// selfCheck.checkProximity()


