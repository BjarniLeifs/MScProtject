
/* /config.js */
const secret_key = 'length.over c0mpl3xity haha6p _$st6dy3f3f';
const payload  = 'payload';
/* Username for database */
const db_local_username   = 'postgres';
const db_product_username = 'postgres';
const db_test_username    = 'postgres';
/* Passowrd for databse */
/* Comment in for local host password

const db_local_password   = '1234';
const db_product_password = '1234';
const db_test_password 	  = '1234';
*/
const db_local_password   = 'pinkman1234';
const db_product_password = 'pinkman1234';
const db_test_password 	  = 'pinkman1234';

/* Starting link of connection */
const db_local_link   = 'postgres://';
const db_product_link = 'postgres://';
const db_test_link 	  = 'postgres://';
/* Host address of the database */
/*  Comment in for local host data. 
const db_local_host   = 'localhost';
const db_product_host = 'localhost';
const db_test_host 	  = 'localhost';
*/

/* Comment in if you want external host data.*/
const db_local_host   = 'ramesdb.apiserver.link';
const db_product_host = 'ramesdb.apiserver.link';
const db_test_host 	  = 'ramesdb.apiserver.link';
/* Port to conntect to for database */
const db_local_port   = '5432';
const db_product_port = '5432';
const db_test_port 	  = '5432';
/* Name of the database */
const db_local_name   = 'uxinn';
const db_product_name = 'uxinn';
const db_test_name 	  = 'uxinn';

function config () { 
	switch(process.env.NODE_ENV) {
		case 'development':
			return {
				'secret' 		: secret_key,
				'payload' 		: payload,
				'database'		: db_local_name,
				'port'			: db_local_port,
				'host'			: db_local_host,
				'user'			: db_local_username,
				'username' 		: db_local_username,
				'pass'			: db_local_password,
				'connectionUrl' 	: '' + db_local_link + db_local_username + ':' + db_local_password + '@' + db_local_host + ':' + db_local_port + '/' + db_local_name,
			};

		case 'production':
			return {
				'secret' 		: secret_key,
				'payload' 		: payload,
				'connectionUrl' : '' + db_product_link + db_product_username + ':' + db_product_password + '@' + db_product_host + ':' + db_product_port + '/' + db_product_name,
			};

		case 'testing':
			return {
				'secret' 		: secret_key,
				'payload' 		: payload,
				'connectionUrl' : '' + db_test_link + db_test_username + ':' + db_test_password + '@' + db_test_host + ':' + db_test_port + '/' + db_test_name,
			};

		default:
			return {
				'secret' 		: secret_key,
				'payload' 		: payload,
				'connectionUrl' : '' + db_local_link + db_local_username + ':' + db_local_password + '@' + db_local_host + ':' + db_local_port + '/' + db_local_name,
			};
	}
}

module.exports = new config();  
