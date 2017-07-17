const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
"use strict";
// READY BUT NEEDS TO TEST BETTER

function User() {
  "use strict"; 
  /* This allows me to call itself, myself.get() and so on. */
  let myself = this; 

  this.get = (res) => {
    "use strict";
    let table  = 'users';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the users.',
              err     : err,
              data    : null,
              Message : 'Failed to get the users'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the users.',
              err     : err,
              data    : result,
              Message : 'Returned all the users.'
            });
      }
    );
  };


  this.getUserByID = function(id, res) {
    "use strict";
    let table  = 'users';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting users by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the users by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the users by type id.',
              err     : err,
              data    : result,
              Message : 'Returned users by type id.'
            });
      }
    );  
  };


  this.update = function(user, res) {
    "use strict";
    let update = stringBuilder.update("users", "id" , user);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update user.',
              err     : err,
              data    : null,
              Message : 'User update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update User.',
              err     : err,
              data    : result,
              Message : 'User updated successfully.'
            });
      }
    );
  };

  this.delete = function(id, res) {
    "use strict";
    let table  = 'users';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete users.',
              err     : err,
              data    : null,
              Message : 'Failed to delete users.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete users.',
              err     : err,
              data    : result,
              Message : 'Deleted users successfully.'
            });
      }
    );
  };

  /* This function is only thought to be used by the system itself! This gives out hash 
   * and all information stored in the database, so do not open this to other purpose 
   */
  this.getFullInfoById = (id, callback) => {
    "use strict";
    let table  = 'Users';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Get full user info by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get full users info by id.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Get full user info.',
              err     : err,
              data    : result,
              Message : 'Got full user info successfully by id.'
            });
      }
    );
  };
  /* This function is only thought to be used by the system itself! This gives out hash 
   * and all information stored in the database, so do not open this to other purpose 
   */
  this.getFullInfoByUsername = (username, callback) => {
    "use strict";
    let table  = 'Users';
    let string = 'SELECT * FROM '+ table + ' WHERE UPPER(username) = UPPER($1)';
    let value  = [username];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Get full user info by username.',
              err     : err,
              data    : null,
              Message : 'Failed to get full users info by username.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Get full user info by username.',
              err     : err,
              data    : result,
              Message : 'Got full user info successfully by username.'
            });
      }
    );
  };  
  /* This function is only thought to be used by the system itself! This gives out hash 
   * and all information stored in the database, so do not open this to other purpose 
   */ 
  this.getFullInfoByEmail = (email, callback) => {
    "use strict";
    let table  = 'Users';
    let string = 'SELECT * FROM '+ table + ' WHERE UPPER(email) = UPPER($1)';
    let value  = [email];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Get full user info by email.',
              err     : err,
              data    : null,
              Message : 'Failed to get full users info by email.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Get full user info by email.',
              err     : err,
              data    : result,
              Message : 'Got full user info successfully by email.'
            });
      }
    );
  };      
  
}
module.exports = new User();