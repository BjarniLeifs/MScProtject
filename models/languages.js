
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');

function Language(){
	"use strict";
  /* 
    This allowes me to call myself with :

      myself.get(
        (err, result) => { 
          code comes here ... 
        }
      ); 
  */
	this.myself = this;

	this.get = (callback) => {
		"use strict";
		let table  = 'languages';
		let string = 'SELECT * FROM ' + table;
		
		dbService.queryString(string, 
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting All languages.',
							err     : err,
							data    : null,
							Message : 'Failed to get languages'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting All languages.',
							err     : err,
							data    : result,
							Message : 'Returned all languages.'
 						});
			}
		);
	};

	this.getLanguageByID = (id, callback) => {
		"use strict";
		let table  = 'languages';
		let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
		let value  = [id]

		dbService.queryStringValue(string, value, 
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting language by id.',
							err     : err,
							data    : null,
							Message : 'Failed to get language by id'
 						});	
				else
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting language by id.',
							err     : err,
							data    : result,
							Message : 'Returned language by id.'
 						});
			}
		);
	};

	this.getLanguageByName = (name, callback) => {
		"use strict";
		let table  = 'languages';
		let string = 'SELECT * FROM '+ table +' WHERE name = $1';
		let value  = [name]		
		
		dbService.queryStringValue(string, value, 
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting language by name.',
							err     : err,
							data    : null,
							Message : 'Failed to get language by name.'
 						});		
				else
					callback(err,
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting language by name.',
							err     : err,
							data    : result,
							Message : 'Returned language by name.'
 						});
			}
		);
	};

	this.create = (language, callback) => {
		"use strict";
		let table  = 'languages';
		let string = 'INSERT INTO '+ table +' (name) VALUES($1)';
		let value  = [id]	

		dbService.queryStringValue(string, value, 
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Create new language.',
							err     : err,
							data    : null,
							Message : 'Language creation failed.'
 						});
				else
					callback(err,
						{	
							valid   : true,
							status  : 200,
							Type    : 'Create new language.',
							err     : err,
							data    : result,
							Message : 'Language created successfully.'
 						});
			}
		);		
	};

	this.update = (language, callback) => {

		let update = stringBuilder.update("languages", "id" , language);
		dbService.queryStringValue(update.string, update.value, 
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Update language.',
							err     : err,
							data    : null,
							Message : 'Language update failed.'
 						});
				else
					callback(err,
						{	
							valid   : true,
							status  : 200,
							Type    : 'Update language.',
							err     : err,
							data    : result,
							Message : 'Language updated successfully.'
 						});

			}

		);
	};

	this.delete = (id, callback) => {
		"use strict";
		let table  = 'languages';
		let string = 'DELETE FROM '+ table + ' WHERE id = $1';
		let value  = [id]		
		
		dbService.queryStringValue(string, value, 
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Delete language.',
							err     : err,
							data    : null,
							Message : 'Failed to delete.'
 						});
				else
					callback(err,
						{	
							valid   : true,
							status  : 200,
							Type    : 'Delete language.',
							err     : err,
							data    : result,
							Message : 'Deleted successfully.'
 						});
			}
		);
	};

};

module.exports = new Language();