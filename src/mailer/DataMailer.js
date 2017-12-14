const nodemailer = require('nodemailer');
const MAILINTERVAL = 3600000;
class DataMailer {
	constructor(options = {}) {
		this.user = process.env.MAIL_USER;
		this.pass = process.env.MAIL_PASS;
		this.receiver = process.env.MAIL_RECEIVER;
		this.isActive = options.isActive || false;
		this.mailIntervalActive = false;


		if(!this.user || !this.pass) {
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

	sendStatusMail(hygroValue) {

		if(!this.isActive) {
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

		console.log('Trying to send data');
		// setup email data with unicode symbols
		let mailOptions = {
			from: `"Plant Status 🌱" <${this.user}>`, // sender address
			to: this.receiver, // list of receivers
			subject: 'Deine Pflanze braucht Dich!', // Subject line
			text: 'Current Status: ' + hygroValue.value, // plain text body
			html: `<h1>Aktueller Status der Pflanze</h1>
				<br/>
				<br/>
				<br/>
				<br/>
              <h3>Aktueller Feuchtigkeitswert: ${hygroValue.value}</h3>
              <table width="100%">
              <tr>
              <td>
              <pre width="100%">
              	${JSON.stringify(hygroValue)}
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

module.exports = new DataMailer();
