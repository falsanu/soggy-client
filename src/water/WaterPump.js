const five = require('johnny-five');

class WaterPump {
	constructor(opts) {

		this.wateringTime = opts.wateringTime ||  1000;
		this.coolDownTime = opts.coolDownTime || 2000;
		this.inDebugMode = opts.inDebugMode | false;
		// this.controlLed = new five.Led('A1');
		this.waterpump = new five.Led('A1');
		this.timer = false;
		this.off();
		console.log(`wateringTime ${this.wateringTime} -- coolDownTime: ${this.coolDownTime}, inDebugMode: ${this.inDebugMode}`);
	}

	water(){
		if(this.timer !== false){
			//watering is running;
			console.log('Watering is running.');
			return;
		}

		console.log('Start watering process');
		this.on();
		this.timer = setTimeout(()=>{
			console.log(`Ready with watering. Took: ${this.wateringTime}`);
			this.off();
			setTimeout(()=>{
				console.log('stopping Timer after coolDownTime.');
				this.timer = false;
			}, this.coolDownTime)

		}, this.wateringTime);

	}

	on(){
		if(this.timer !== false){
			//watering is running;
			console.log('Watering is running.');
			return;
		}
		console.log('enabled statusLED');
		// this.controlLed.on();
		if(!this.inDebugMode) {
			console.log('enabled waterPump');
			this.waterpump.on();
		}
	}

	off() {
		console.log('disabled statusLED');
		// this.controlLed.off();
		if(!this.inDebugMode) {
			console.log('disabled waterpump');
			this.waterpump.off();
		}
	}
}
module.exports = WaterPump;
