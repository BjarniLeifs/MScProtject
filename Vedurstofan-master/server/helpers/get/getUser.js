var exports = module.exports = {};

var pg = require('pg');
/* Definging configuration of database config */
var db = require('../../config/database');
/* Defining connectionstring for the database */
var connectionString = process.env.DATABASE_URL || db.url;


exports.getUserValue = function (string, value, cb) {
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
			object = {
				id 			: row.id,
				name 		: row.name,
				username 	: row.username,
				email 		: row.email,
				phone 		: row.phone,
				roles 		: row.roles,
				company 	: row.company,
				address 	: row.address,
				comments 	: row.comments,
				isactive 	: row.isactive,
				imageurl 	: row.imageurl,
				isadmin 	: row.isadmin,
				isreader 	: row.isreader,
				iswriter 	: row.iswriter,
				ismoderator : row.ismoderator

			};
			results.push(object);
		});
		/* close connection */
		query.on('end', function () {
			if (err) {
				done();
				return cb(err, null);
			} else {
				done();
				return cb(err,results);
			}
		});
	});
};


exports.getUser = function (string, cb) {
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
			object = {
				id 			: row.id,
				name 		: row.name,
				username 	: row.username,
				email 		: row.email,
				phone 		: row.phone,
				roles 		: row.roles,
				company 	: row.company,
				address 	: row.address,
				comments 	: row.comments,
				isactive 	: row.isactive,
				imageurl 	: row.imageurl,
				isadmin 	: row.isadmin,
				isreader 	: row.isreader,
				iswriter 	: row.iswriter,
				ismoderator : row.ismoderator

			};
			results.push(object);
		});
		/* close connection */
		query.on('end', function () {
			if (err) {
				done();
				return cb(err, null);
			} else {
				done();
				return cb(err,results);
			}
		});
	});
};