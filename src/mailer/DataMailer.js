const nodemailer = require('nodemailer');
const MAILINTERVAL = 60*60*24;
class DataMailer {
	constructor(options = {}) {
		this.user = process.env.MAIL_USER;
		this.pass = process.env.MAIL_PASS;
		this.receiver = process.env.MAIL_RECEIVER;
		this.isActive = options.isActive || false;
		this.mailIntervalActive = false;

		this.hasWaterWarning = '';


		if (!this.user || !this.pass) {
			this.isActive = false;
			return;
		}


		this.transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: this.user,
				pass: this.pass
			}
		});
	}

	sendStatusMail(data) {

		if (!this.isActive) {
			console.log('Mailer not active');
			return;
		}
		if (this.mailIntervalActive) {
			console.log('Mail send within interval. Not sending Mail.');
			return;
		}

		this.mailIntervalActive = setTimeout(() => {
			console.log('Mail interval started');
			this.mailIntervalActive = false;
		}, MAILINTERVAL);

		if(!data.hasWater) {
			this.hasWaterWarning = `<h2 style='color:red'>Die Pflanze braucht Wasser</h2>`;
		}

		console.log('Trying to send data');
		// setup email data with unicode symbols
		let mailOptions = {
			from: `"Plant Status 🌱" <${this.user}>`, // sender address
			to: this.receiver, // list of receivers
			subject: 'Deine Pflanze braucht Dich!', // Subject line
			text: 'Current Status: ' + data.hygroValue, // plain text body
			html: `<h1>Aktueller Status der Pflanze</h1>
				<br/>
				<br/>
				<br/>
				<br/>
				${this.hasWaterWarning}
				<h3>Aktueller Wasserpegel: ${Math.round(data.waterAboveGround)} mm (${Math.round(data.waterLevel)}%)</h3>
			  	<h3>Aktueller Feuchtigkeitswert: ${data.hygroValue}</h3>
			  
              <table width="100%">
              <tr>
              <td>
              <pre width="100%">
${JSON.stringify(data)}
              </pre>
			  </td>
			  </tr>
			</table>`

		};

		// send mail with defined transport object
		this.transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
		});

	}
}

module.exports = DataMailer;
