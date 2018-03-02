const five = require('johnny-five');
const mailer = require('../mailer/DataMailer');

class Hygro {

	constructor() {
		this.hygro = new five.Pin('A0');
		this.hygroPower = new five.Pin(3);
		this.hygroPower.high();
		this.hasPower = false;
		this.currentValue = 0;
		this.isMeasuring = false;
		return this;
	}

	powerOn() {
		this.hygroPower.high();
		this.hygro.query(state=>{
			this.currentValue = state.query
		});
		this.hasPower = true;
	}
	powerOff() {
		this.hygroPower.low();
		this.hasPower = false;
	}

	query() {
		return this.hygro.query;
	}
	measure(){
		
		let that= this;
		// if(!this.isMeasuring){
			this.hygro.query(state=>{
				that.currentValue = state.value
			});
			this.isMeasuring = true;
		// }
	}
	value(){
		return this.currentValue
	}


}

module.exports = Hygro;
