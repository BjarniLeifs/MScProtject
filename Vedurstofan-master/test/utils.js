var exports = module.exports = {};
var request = require('supertest');
var users = require('../server/helpers/users');

var http = require('http');

  


exports.getAdminToken = function () {

	var object = {
		id: 1,
		username: 'bjarni',
		password: 'bjarni',
		isAdmin  : true
	};

	return users.generateJWT(object);

};

exports.getUserToken = function () {
	var object = {
		id: 1,
		username: 'bjarni',
		password: 'bjarni',
		isAdmin  : false
	};

	return users.generateJWT(object);
};
