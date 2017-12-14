const request = require('request');
class DataLogger {

	constructor() {
		this.apiEndpoint = process.env.API_ENDPOINT || 'http://localhost:3000';
		this.plantId = process.env.PLANT_ID || null;
		this.path = process.env.API_PATH || '/api/data';
	}

	async logData(hygroValue, willWater, waterLevel) {
		if (!this.plantId) {
			console.log('No plantID given');
			return;
		}
		const normalizedData = {
			"plantId": this.plantId,
			"hygro": hygroValue,
			"waterLevel": waterLevel,
			"willWater": willWater,
		}

		const apiEndpoint = this.apiEndpoint + this.path;
		console.log(`Sending Request to: ${apiEndpoint}`);
		request({
			url: apiEndpoint,
			method: 'POST',
			json: true,
			body: normalizedData
		}, function (error, response, body){
			if (error) {
				console.log(error.message);
			}
			if (!error && response.statusCode == 200) {
				console.log(response.statusCode + 'Data sent')
			}

		});
	}
}

module.exports = new DataLogger();
