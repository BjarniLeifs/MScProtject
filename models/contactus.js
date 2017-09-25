
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const contact = require('./../DTO/contactus');

function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(contact.DTO(data[i].id, data[i].name, data[i].email, data[i].subject, data[i].nessage, data[i].seen, data[i].answered));

    return object;

}

function Contactus() { 
	"use strict";

	this.get = (callback) => {
		"use strict";
		let table  = 'contactus';
		let string = 'SELECT * FROM ' + table;
		
		dbService.queryString(string, 
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting All contact us messages.',
							err     : err,
							data    : null,
							Message : 'Failed to get contact us messages'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting All contact us messages.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned all contact us messages.'
 						});
			}
		);
	};

	this.getById = (id, callback) => {
		"use strict";
		let table  = 'contactus';
		let string = 'SELECT * FROM ' + table + ' Where id = ($1)';
		let value = [id];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting contact us by id.',
							err     : err,
							data    : null,
							Message : 'Failed to get contact us information by id'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting contact us by id.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned all contact us messages by id.'
 						});
			}
		);
	};

	this.getByEmail = (email, callback) => {
		"use strict";
		let table  = 'contactus';
		let string = 'SELECT * FROM ' + table + ' Where email = ($1)';
		let value = [email];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting contact us by email.',
							err     : err,
							data    : null,
							Message : 'Failed to get contact us information by email'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting contact us by email.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned all contact us messages by email.'
 						});
			}
		);
	};


	this.getBySubject = (subject, callback) => {
		"use strict";
		let table  = 'contactus';
		let string = 'SELECT * FROM ' + table + ' Where subject = ($1)';
		let value = [subject];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting contact us by subject.',
							err     : err,
							data    : null,
							Message : 'Failed to get contact us information by subject'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting contact us by subject.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned all contact us messages by subject.'
 						});
			}
		);
	};

	this.getBySeenStatus = (trueOrFalse, callback) => {
		"use strict";
		let table  = 'contactus';
		let string = 'SELECT * FROM ' + table + ' Where seen = ($1)';
		let value = [trueOrFalse];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting contact us by seen status.',
							err     : err,
							data    : null,
							Message : 'Failed to get contact us information by seen'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting contact us by seen status.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned all contact us messages by seen. ('+ trueOrFalse +')'
 						});
			}
		);
	};

	this.getByAnsweredStatus = (trueOrFalse, callback) => {
		"use strict";
		let table  = 'contactus';
		let string = 'SELECT * FROM ' + table + ' Where answered = ($1)';
		let value = [trueOrFalse];
		
		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, 
						{	
							valid   : false,
							status  : 400,
							Type    : 'Getting contact us by answered status.',
							err     : err,
							data    : null,
							Message : 'Failed to get contact us information by answered'
 						});
				else 
					callback(err, 
						{	
							valid   : true,
							status  : 200,
							Type    : 'Getting contact us by answered status.',
							err     : err,
							data    : DTO(result),
							Message : 'Returned all contact us messages by answered. ('+ trueOrFalse +')'
 						});
			}
		);
	};

	this.create = function(object, callback) {
		"use strict";
		let table  = 'contactus';
		let string = 'INSERT INTO '+ table + '(Name, Email, Subject, Message, Seen, Answered) VALUES($1, $2, $3, $4, $5, $6) reruning *';
		let value = [object.Name, object.Email, object.Subject, object.Message, false, false];

		dbService.queryStringValue(string, value, 
			(err, result) => {
				if (err)
					callback(err, 
					{ 
						valid   : false,
						status  : 400,
						Type    : 'Create new message in contact us.',
						err     : err,
						data    : null,
						Message : 'Creating message in contact us failed.'
					});
				else
					callback(err,
					{ 
						valid   : true,
						status  : 200,
						Type    : 'Create new message in contact us.',
						err     : err,
						data    : DTO(result),
						Message : 'New message was created successfully.'
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
						Type    : 'Update contact us.',
						err     : err,
						data    : null,
						Message : 'Contact us update failed.'
					});
				else
					callback(err,
					{ 
						valid   : true,
						status  : 200,
						Type    : 'Update contact us.',
						err     : err,
						data    : DTO(result),
						Message : 'Contact us updated successfully.'
					});

			}
		);
	};

	this.updateSeen = (object, callback) => {
		"use strict";
		let table = 'contactus';
		let string = 'Update ' + table + ' SET seen = ($1) WHERE id = ($2) returning *'
		let value = [object.bool, object.id];

		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, {
						valid   : false,
						status  : 400,
						Type    : 'Update seen for id in contact us.',
						err     : err,
						data    : null,
						Message : 'Seen in contact us for id : '+ object.id +' failed.'
					});
				else 
					callback(err,
					{ 
						valid   : true,
						status  : 200,
						Type    : 'Update seen for id in contact us.',
						err     : err,
						data    : DTO(result),
						Message : 'Contact us updated seen for id : '+ object.id +' successfully.'
					});
			}
		);
	};

	this.updateAnswered = (object, callback) => {
		"use strict";
		let table = 'contactus';
		let string = 'Update ' + table + ' SET Answered = ($1) WHERE id = ($2) returning *'
		let value = [object.bool, object.id];

		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err)
					callback(err, {
						valid   : false,
						status  : 400,
						Type    : 'Update seen for id in contact us.',
						err     : err,
						data    : null,
						Message : 'Seen in contact us for id : '+ object.id +' failed.'
					});
				else 
					callback(err,
					{ 
						valid   : true,
						status  : 200,
						Type    : 'Update seen for id in contact us.',
						err     : err,
						data    : DTO(result),
						Message : 'Contact us updated seen for id : '+ object.id +' successfully.'
					});
			}
		);
	};

	this.delete = (id, callback) => {
		"use strict";
		let table = 'contactus';
		let string = 'DELETE FROM '+ table + ' WHERE id = ($1)';
		let value = [id];

		dbService.queryStringValue(string, value,
			(err, result) => {
				if (err) 
					callback(err, {
						valid   : false,
						status  : 400,
						Type    : 'Delete contact us.',
						err     : err,
						data    : null,
						Message : 'Failed to delete contact us message.'
					});
				else 
					callback(err,
					{ 
						valid   : true,
						status  : 200,
						Type    : 'Delete contact us.',
						err     : err,
						data    : DTO(result),
						Message : 'Contact us message deleted successfully.'
					});					
			}
		);
	};


};




module.exports = new Contactus();