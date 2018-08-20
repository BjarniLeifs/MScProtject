### DTO 
This folder contains all Data Transfer Objects for the api that is sent back when requested. 

This is done to filter out anything that we feel is not needed to be transfered to the user, as the object from the database often holds a lot of information that the user does not need to have or we do not want to give him all the information. 

Build this DTO for each table within the database such as you control what the user gets. Example of this can be found in models folder in each of the *.js files. 

e.g. 

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

This is used when returning data in callback e.g. DTO(results) where results represent the response from the database. 

e.g. 

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