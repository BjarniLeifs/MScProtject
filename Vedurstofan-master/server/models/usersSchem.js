/* 
	Here we create a new instance of Client to interact with the database and then establish
	communication with it via the connect(). We then set run a SQL query via the query()
	method. Communication is closed via the end(). Be sure to check out the documentation 
	at : https://github.com/brianc/node-postgres/wiki/Client
*/
/* Definging postgressSQL module */
var pg = require('pg');
/* Definging configuration of database config */
var db = require('../config/database');
/* Defning helper user */
var userAuth = require('../helpers/users');
/* Defining connectionstring for the database */
var connectionString = process.env.DATABASE_URL || db.url;
/* Defining istance of client and where it is located */

var adminObject = userAuth.setPassword('admin');
var admin = {
	username  		: 'admin',
	name 			: 'Admin',
	roles 			: 'Admin',
	company 		: 'Veðurstofa Íslands',
	phone 			: '1234567',
	email	   		: 'admin@trausti.is',
	address 		: 'Bústaðarvegur 7-9',
	comments 		: 'Má EKKI breyta upplýsingum',
	salt 			: adminObject.salt,
	hash	 		: adminObject.hash,
	isAdmin 		: true,
	reset_token 	: null,
	token_expired   : null,
	isactive 		: true
};
insertUser(admin);


function insertUser(insertObject, client, done) {
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			done(err);
			return res.status(400).json({message: 'Error fetching client from pool'});
		}
		var search = client.query('select email from users where email = $1', [insertObject.email]);

		search.on('row', function (row) {
	
		
		});
			/* close connection */
		search.on('end', function () {
			if (err) {
				done();
				return err;
			} else {
				done();
					
			}
		});
		if(search.length === undefined ) {
			/* SQL Query, select data */
			var query = client.query('INSERT INTO users (username, name, roles, company, phone, email, address, comments, hash, salt, isAdmin, reset_token, token_expired, isactive) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
			[insertObject.username, insertObject.name, insertObject.roles, insertObject.company, insertObject.phone, insertObject.email, insertObject.address, insertObject.comments, insertObject.hash, insertObject.salt, insertObject.isAdmin, insertObject.reset_token, insertObject.token_expired, insertObject.isactive],
				function (err, result) {
	        		done();
	    		}
	    	);
			/* Stream results back */
			query.on('row', function (row) {
				done();
			});
			/* close connection */
			query.on('end', function () {
				if (err) {
					done();

					return err;
				} else {
					done();

					console.log("User " + insertObject.username + " added.");
				}
			});
		}
	});
}





/* Making tables and definging them in DATABASE */
//var query = client.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, username VARCHAR(40) not null, name VARCHAR(40) not null, roles VARCHAR(40), company VARCHAR(40) not null, phone VARCHAR(20), email VARCHAR(40), address VARCHAR(40), comments VARCHAR (500), hash VARCHAR(300), salt VARCHAR(300), isAdmin BOOLEAN)');
/* Closing the connection for query after making table */
//query.on('end', function() { client.end(); });	

/* USER TABLE 
	id 			serial primary key  (auto generate)
	username 	varchar(40) not null
	name VARCHAR(40) not null 
	roles VARCHAR(40) 
	company VARCHAR(40) not null
	phone VARCHAR(20) 
	email VARCHAR(40)
	address VARCHAR(40)
	comments VARCHAR (500)

 	hash 		varchar(300)
 	salt 		varchar(300)
 	isAdmin 	boolean
*/

/* Closing the connection for query after making table */