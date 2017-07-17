
const pg = require('pg');
/* Definging configuration of database config */
const config = require('./../config/configuration');
/* Defining connectionstring for the database */
const connectionString = config.connectionUrl;

module.exports = {
	/* Query to get all */
	queryString: (string, cb) => {
		"use strict";
		let results = [];	

		pg.connect(connectionString, (err, client, done) => {
			if (err) {
				done(err);
				return cb(err, null);
			}

			/* SQL Query, select data */
			let query = client.query(string, (err, result) => {
				if (err) {
					done(err);
					return cb(err, null);
				}
				done();
			});
			
			/* Stream results back */
			query.on('row', (row) => {
				results.push(row);
			});

			/* close connection */
			query.on('end', () => {
				if (err) {
					done();
					return cb(err, null);
				} else {
					done();
					return cb(err,results);
				}
			});
		});
	},
	/* Query to get all with an value */
	queryStringValue: (string, value, cb) => {
		"use strict";
		let results = [];	

		pg.connect(connectionString, (err, client, done) => {
			if (err) {
				done(err);
				return cb(err, null);
			}

			/* SQL Query, select data */
			let query = client.query(string, value, (err, result) => {
				if (err) {
					done(err);
					return cb(err, null);
				}
				done();
			});
	
			/* Stream results back */
			query.on('row', (row) => {
				results.push(row);
			});

			/* close connection */
			query.on('end', () => {
				if (err) {
					done();
					return cb(err, null);
				} else {
					done();
					return cb(err,results);
				}
			});
		});
	}
// exports ends
};

