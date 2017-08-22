var exports = module.exports = {};

var pg = require('pg');
/* Definging configuration of database config */
var db = require('../../config/database');
/* Defining connectionstring for the database */
var connectionString = process.env.DATABASE_URL || db.url;


/* Query to post all with an value */
exports.postValue = function (string, value, cb) {
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
		});
		/* close connection */
		query.on('end', function () {
			if (err) {
				done();
				return cb(err, null);
			} else {
				done();
				//console.log("done " + results);
				return cb(err, results);
			}
		});
	});

};