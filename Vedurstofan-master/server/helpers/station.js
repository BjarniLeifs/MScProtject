var exports = module.exports = {};

/* Declare of crypto model, it is for salt and hasing information. Security model. */
var crypto = require('crypto');

/*
 Declare of jwt (Json web token), used for client and server for authanticating user 
 This is done for security feature.. other method that can be used = sessions.
*/
var jwt = require('jsonwebtoken');

/* Getting secrets config file. */
var secure = require('../config/secrets');

/* Definging postgressSQL module */
var pg = require('pg');
/* Definging configuration of database config */
var db = require('../config/database');
/* Defining connectionstring for the database */
var connectionString = process.env.DATABASE_URL || process.env.TEST_ENV || db.url;

exports.blsT = function (name) {
	var results;
	return pg.connect(connectionString, function (err, client, done) {
		if (err) {
			/* Error handle done(err) is releasing the pool connection  */
			done(err);
		}

		var query = client.query('INSERT INTO bls (name) VALUES ($1) RETURNING *', 
			[name], function (err, results) {
        		done();
			});

		query.on('row', function (row) {
			results = row;
		});
		
		query.on('end', function() {
			if (err) {
				done();
				return err;
			} else {
				done();
				return results;
			}
		});
	});

};





























