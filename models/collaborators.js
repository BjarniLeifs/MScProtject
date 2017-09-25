
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const collaborators = require('./../DTO/collaborators');

function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(collaborators.DTO(data[i].id, data[i].name, data[i].email, data[i].degree, data[i].year, data[i].role, data[i].info, data[i].image));

    return object;

}

function Contactus() { 
	"use strict";

	this.get = (callback) => {
		"use strict";
		let table  = 'collaborators';
		let string = 'SELECT * FROM ' + table;
		
		dbService.queryString(string, 
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting All collaborators.',
							err     : err,
							data    : null,
							Message : 'Failed to get collaborators'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting All collaborators.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned all collaborators.'
 						});
			}
		);
	};

	this.getById = (id, callback) => {
		"use strict";
		let table  = 'collaborators';
		let string = 'SELECT * FROM ' + table + ' Where id = ($1)';
		let value = [id];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting collaborator by id.',
							err     : err,
							data    : null,
							Message : 'Failed to get collaborators by id'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting collaborators by id.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned collaborator by id.'
 						});
			}
		);
	};

	this.getByEmail = (email, callback) => {
		"use strict";
		let table  = 'collaborators';
		let string = 'SELECT * FROM ' + table + ' Where email = ($1)';
		let value = [email];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting collaborators by email.',
							err     : err,
							data    : null,
							Message : 'Failed to get collaborator by email'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting collaborators by email.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned collaborators by email.'
 						});
			}
		);
	};
	
	this.getByName = (name, callback) => {
		"use strict";
		let table  = 'collaborators';
		let string = 'SELECT * FROM ' + table + ' Where name = ($1)';
		let value = [name];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting collaborators by name.',
							err     : err,
							data    : null,
							Message : 'Failed to get collaborator by name'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting collaborators by name.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned collaborators by name.'
 						});
			}
		);
	};

	this.getByRole = (role, callback) => {
		"use strict";
		let table  = 'collaborators';
		let string = 'SELECT * FROM ' + table + ' Where role = ($1)';
		let value = [role];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting collaborators by role.',
							err     : err,
							data    : null,
							Message : 'Failed to get collaborator by role'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting collaborators by role.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned collaborators by role.'
 						});
			}
		);
	};
	
	this.getByDegree = (degree, callback) => {
		"use strict";
		let table  = 'collaborators';
		let string = 'SELECT * FROM ' + table + ' Where degree = ($1)';
		let value = [degree];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting collaborators by degree.',
							err     : err,
							data    : null,
							Message : 'Failed to get collaborator by degree'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting collaborators by degree.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned collaborators by degree.'
 						});
			}
		);
	};

	this.getByYear = (year, callback) => {
		"use strict";
		let table  = 'collaborators';
		let string = 'SELECT * FROM ' + table + ' Where year = ($1)';
		let value = [year];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting collaborators by year.',
							err     : err,
							data    : null,
							Message : 'Failed to get collaborator by year'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting collaborators by year.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned collaborators by year.'
 						});
			}
		);
	};



	this.create = function(object, callback) {
		"use strict";
		let table  = 'contactus';
		let string = 'INSERT INTO '+ table + '(Name, Email, Degree, Year, Role, Information, Image) VALUES($1, $2, $3, $4, $5, $6, $7) reruning *';
		let value = [object.Name, object.Email, object.Degree, object.Year, object.Role, object.Information, object.Image];

		dbService.queryStringValue(string, value, 
			(err, result) => {
				if (err)
					callback(err, 
					{ 
						valid   : false,
						status  : 400,
						Type    : 'Create new collaborator.',
						err     : err,
						data    : null,
						Message : 'Creating collaborators failed.'
					});
				else
					callback(err,
					{ 
						valid   : true,
						status  : 200,
						Type    : 'Create new collaborator.',
						err     : err,
						data    : DTO(result),
						Message : 'Collaborator was created successfully.'
					});
			}	
		);  
	}

	this.update = (contactinformation, callback) => {
		"use strict";
		let update = stringBuilder.update("contactus", "id" , contactinformation);

		dbService.queryStringValue(update.string, update.value, 
			(err, result) => {
				if (err)
					callback(err, 
					{ 
						valid   : false,
						status  : 400,
						Type    : 'Update collaborators.',
						err     : err,
						data    : null,
						Message : 'Collaborators update failed.'
					});
				else
					callback(err,
					{ 
						valid   : true,
						status  : 200,
						Type    : 'Update collaborators.',
						err     : err,
						data    : DTO(result),
						Message : 'Collaborators updated successfully.'
					});

			}
		);
	};


	this.delete = (id, callback) => {
		"use strict";
		let table = 'collaborators';
		let string = 'DELETE FROM '+ table + ' WHERE id = ($1)';
		let value = [id];

		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err) 
					callback(err, {
						valid   : false,
						status  : 400,
						Type    : 'Delete collaborators.',
						err     : err,
						data    : null,
						Message : 'Failed to delete collaborators.'
					});
				else 
					callback(err,
					{ 
						valid   : true,
						status  : 200,
						Type    : 'Delete contact us.',
						err     : err,
						data    : DTO(result),
						Message : 'Collaborator deleted successfully.'
					});					
			}
		);
	};


};




module.exports = new Contactus();