const five = require('johnny-five');
const mailer = require('../mailer/DataMailer');

class Hygro {

	constructor() {
		this.hygro = new five.Pin('A0');
		this.hygroPower = new five.Pin(2);
		this.hygroPower.low();
		this.hasPower = false;
		return this;
	}

	powerOn() {
		this.hygroPower.high();
		this.hasPower = true;
	}
	powerOff() {
		this.hygroPower.low();
		this.hasPower = false;
	}

	query() {
		return this.hygro.query;
	}

}

module.exports = Hygro;
