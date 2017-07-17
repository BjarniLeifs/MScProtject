const request = require('supertest');
//const users = require('../../library/users');
const http = require('http');

module.exports = {
	getUserToken: () => {
		var object = {
			id: 1,
			username: 'bjarni',
			password: 'bjarni',
		};

		return users.generateJWT(object);
	}
};


