const Planty = require('./src/Planty/Planty');

const options = {
	debugMode: process.env.DEBUG || 0,
	wateringTriggerValue: process.env.WATERING_TRIGGER_VALUE || 800,
	wateringTime: process.env.WATERING_TIME || 1000,
	measureInterval: process.env.MEASURE_INTERVAL || 2000
}

const planty = new Planty(options);
console.log(`Starting Soggy-Client with options:`, options);

planty.startServer();

// todo: we need a process.exit() shutdown mechanism, to set all pins to 0 in case of emergency
