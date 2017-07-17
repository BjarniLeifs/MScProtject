const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config/configuration');
const email = require('./../config/mailOption');

module.exports = {
/* After generate token this is used to send e-mail to user with token. */
	sendResetPassEmail: (user, token, req) => {
		/* Defining the transporter to send email with configureation */
		let transporter = nodemailer.createTransport(smtpTransport({
			    host: email.smtpHost,
			    port: email.smtpPort,
		   		auth: {
		       		user: email.emailUser,
		       		pass: email.emailPass
		    	}
			})
		);
		/* Structor for the e-mail to be sent. */
		let mailOptions = {
			to: user.email,
			from: email.emailUser,
			subject: ''+email.emailSubject + user.name + email.projectName+'',
			text: ''+email.greeting + user.name + email.contentMailToken +
				email.http + req.headers.host + email.injectUrl + token.token + ' \n\n' + email.regards +''
		};
		/* Sending e-mail to user, error checking or send. */
		transporter.sendMail(mailOptions, (err, res) => {
			if (err)
				return err;
			else 
				return true;
		});
	},
	/* Same as other above, however this is only sent to confirm that everything went well or not. */
	confirmPassReset: (user, req) => {
		let transporter = nodemailer.createTransport(smtpTransport({
			    host: email.smtpHost,
			    port: email.smtpPort,
		   		auth: {
		       		user: email.emailUser,
		       		pass: email.emailPass
		    	}
			})
		);
		let mailOptions = {
			to: user.email,
			from: config.emailUser,
			subject: '' + email.emailSubject + user.name + email.projectName +'',
			text: '' + email.greeting + user.name + email.contentMailReportChangePass + email.regards +''
		};

		transporter.sendMail(mailOptions, (err, res) => { 
			if (err)
				return err;
			else 
				return true;
		});	
	}
/* exports ends */
};
