const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/* Definging configuration of database config */
const config = require('./../config/configuration');
module.exports = {
	/* 
	 Generating json web token for user.. exp = expire, returns token
	 with id, usernamem scope and when it expires +
	*/
	generateJWT: (object) => {
		/* Set expirateion to 4 days. */
		console.log(object);
		let today = new Date();
		let exp = new Date(today);
		let scopes = [];
		exp.setDate(today.getDate() + 4);
		
		scopes.push('user');

		/* Sign the token and return it. */
		return jwt.sign({
			/* 
			 Payload, here we can set what ever we want to send with
			 the token and use for what ever we want. Pease do not send
			 password or other sensitive information.
			*/
			userid 		: object.ID,
			username: object.Username,
			name 	: object.Name,	
			scopes  : scopes,
			exp 	: parseInt(exp.getTime() /1000)
		}, 
		config.secret);
	},
	/* Just used to reset password and store this token */
	generateResetJWT: (object) => {
		/* Set expirateion to 4 days. */
		let today = new Date();
		let exp = new Date(today);
		let scopes = [];
		exp.setDate(today.getDate() + 4);
		
		scopes.push('user');
	
		/* Sign the token and return it. */
		return jwt.sign({
			/* 
			 Payload, here we can set what ever we want to send with
			 the token and use for what ever we want. Pease do not send
			 password or other sensitive information.
			*/
			userid 	: object.id,
			username: object.username,
			name 	: object.name,	
			scopes  : scopes,
			exp 	: parseInt(exp.getTime() /1000)
		}, 
		config.secret);
	},
	decodeJWT: (req) => {
		let token = req.headers.authorization;
		let decoded;
		if (token !== undefined) {
			token2 = token.substring(7);
			decoded = jwt.verify(token2, config.secret);
		} else {
			decoded = null;
		}	
		return decoded;
	},
	/* Validating the password of user. */
	validPassword: (password, hash, callback) => {
		bcrypt.compare(password, hash, (err, res) => {
			console.log(res);
	    	callback(res);
		});
	},
};
