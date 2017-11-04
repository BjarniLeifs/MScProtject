
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const project = require('./../DTO/project');
const reportsModel = require('./reports');
function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(project.DTO(data[i].id, data[i].name, data[i].description, data[i].userid, data[i].createdat, data[i].lastupdate));

    return object;

}
function Project(){
	"use strict";

	this.get = (callback) => {
		"use strict";
		let table  = 'project';
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
							data    : DTO(result),
							Message : 'Returned all languages.'
 						});
			}
		);
	};

	this.getProjectByUserId = (id, callback) => {
		"use strict";
		let table  = 'project';
		let string = 'SELECT * FROM ' + table + ' Where userid = ($1)';
		let value = [id];
		
		dbService.queryStringValue(string, value,
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
							data    : DTO(result),
							Message : 'Returned all languages.'
 						});
			}
		);
	};

	this.getProjectByIdAndUserId = (uid, pid, callback) => {
		"use strict";
		let table  = 'project';
		let string = 'SELECT * FROM ' + table + ' Where userid = ($1) AND id = ($2)';
		let value = [uid, pid];
		
		dbService.queryStringValue(string, value,
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
							data    : DTO(result),
							Message : 'Returned all languages.'
 						});
			}
		);
	};



	this.create = (project, callback) => {
		"use strict";
		let date = new Date();
		let table  = 'project';
		let string = 'INSERT INTO '+ table +' (name, description, userid, createdat, lastupdate) VALUES($1, $2, $3, $4, $5) returning *';
		let value  = [project.name, project.description, project.userid, date, date];	

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
							data    : DTO(result),
							Message : 'Language created successfully.'
 						});
			}
		);		
	};

	this.update = (project, callback) => {
		let date = new Date();
		let addString = 'UPDATE project SET name = ($1), description = ($2), userid = ($3), lastupdate =($4)  where id = ($5) returning *';
		let addValue = [project.name, project.description, project.userid, date, project.id];
		dbService.queryStringValue(addString, addValue, 
			(err, result) => {
				console.log(err);
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Update project.',
							err     : err,
							data    : null,
							Message : 'Project update failed.'
					});
				else
					callback(err,
						{	
							valid   : true,
							status  : 200,
							Type    : 'Update project.',
							err     : err,
							data    : DTO(result),
							Message : 'Project updated successfully.'
					});

			}

		);
	};

	  // Delete the rames project with the given id
	  this.delete = (id, req, callback) => {
	    "use strict";
	    let table  = 'project';
	    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
	    let reportString = "SELECT * from reports where projectid = $1";
	    let value  = [id];   
	    
	    dbService.queryStringValue(string, value, 
	      (err, result) => {
	        if (err)
	          callback(err, 
	            { 
	              valid   : false,
	              status  : 404,
	              Type    : 'Delete project.',
	              err     : err,
	              data    : null,
	              Message : 'Failed to delete project.'
	            });
	        else {
	        	dbService.queryStringValue(reportString, value,
	        		(errs, results) => {
	        			if (errs)
	        				callback(err,
	        				{
	        					valid : false,
	        					status: 404,
	        					Type : 'Did not find any reports by project id.',
	        					err : errs,
	        					data: null,
	        					Message: 'Failed failed to find reports by project id, when deleting proejct.'
	        				});
	        			else {
	        				var length = results.length;
	        				var i;
	        				for (i = 0; i < length; i++) {
								reportsModel.delete(req, results[i].id,
									(errrs, reports) => {
										if (errrs) 
											callback(errrs,
	        								{
					        					valid : false,
					        					status: 404,
					        					Type : 'Deleting reports, when deleting project faild..',
					        					err : errs,
					        					data: null,
					        					Message: 'Failed failed to delete reports by project id, when deleting proejct.'
					        				});
									}
								);	        					
	        				}
	        			}
	        		})
				callback(err,
	            { 
	              valid   : true,
	              status  : 200,
	              Type    : 'Delete project.',
	              err     : err,
	              data    : DTO(result),
	              Message : 'Deleted project successfully.'
	            });
	        }
	      }
	    );
  	};
}
module.exports = new Project();