var exports = module.exports = {};

var pg = require('pg');
/* Definging configuration of database config */
var db = require('../../config/database');
/* Defining connectionstring for the database */
var connectionString = process.env.DATABASE_URL ||  db.url;

/* Query to get all */
exports.getAll = function (string, cb) {

	var results = [];	
		
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			done(err);
			return cb(err, null);
		}

		/* SQL Query, select data */
		var query = client.query(string,
			function (err, result) {
        		done();
    		}
    	);
		/* Stream results back */
		query.on('row', function (row) {
			results.push(row);
			//console.log(row);
		});

		/* close connection */
		query.on('end', function () {
			if (err) {
				done();
				return cb(err, null);
			} else {
				done();
				//console.log("done " + results);
				return cb(err,results);
			}
		});
	});
};
/* Query to get all with an value */
exports.getByValue = function (string, value, cb) {

	var results = [];	
		
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			done(err);
			return cb(err, null);
		}

		/* SQL Query, select data */
		var query = client.query(string, value,
			function (err, result) {
        		done();
    		}
    	);
		/* Stream results back */
		query.on('row', function (row) {
			results.push(row);
			//console.log(row);
		});

		/* close connection */
		query.on('end', function () {
			if (err) {
				done();
				return cb(err, null);
			} else {
				done();
				//console.log("done " + results);
				return cb(err,results);
			}
		});
	});

};