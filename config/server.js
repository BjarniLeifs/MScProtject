const main_port = 3001;
const dev_port 	= 3001;
const prod_port = 3001;
const test_port = 3001;
const main_host = "localhost";
const dev_host = "localhost";
const prod_host = "localhost";
const test_host = "localhost";


function config  () { 
	switch(process.env.NODE_ENV) {
		case 'development':
			return {
				'port' : dev_port,
				'host' : dev_host
			};

		case 'production':
			return {
				'port' : prod_port,
				'host' : prod_host
			};

		case 'testing':
			return {
				'port' : test_port,
				'host' : test_host	
			};
		default:
			return {
				'port' : main_port,
				'host' : main_host
			};
	}
}

module.exports = new config();  