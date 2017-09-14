
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const ramesPcture = require('./../DTO/rames_picture');
function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(ramesCatgeroy.DTO(data[i].id, data[i].name, 
                  data[i].url));

    return object;

}

function RamesPicture() {

  this.get = (callback) => {
    "use strict";
    let table  = 'rames_picture';
    let string = 'SELECT * FROM ' + table;
    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the rames picture.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames picture'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the rames picture.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the rames picture.'
            });
      }
    );
  };

  // Get all rames picture by id
  this.getRamespictureByID = (id, callback) => {
    "use strict";
    let table  = 'rames_picture';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting question the rames picture by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames picture by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames picture by id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned the rames picture by id.'
            });
      }
    );
  };

  // Add rames picturen
  this.create = (data, callback) => {
    "use strict";
    let table  = 'rames_picture';
    let string = 'INSERT INTO '+ table + '(Name, Url) VALUES($1, $2)';
    let value = [data.Name, data.Info];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new Rames picture.',
              err     : err,
              data    : null,
              Message : 'Rames picture creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Rames picture.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames picture creation failed created successfully.'
            });
      }
    );
  };

  // Update specific rames picturen
  this.update = (info, callback) => {
    "use strict";
    let update = stringBuilder.update("rames_picture", "id" , info);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update Rames picture update.',
              err     : err,
              data    : null,
              Message : 'Rames picture update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update Rames picture update.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames picture updated successfully.'
            });
      }
    );
  };

  // Delete the rames picturen with the given id
  this.delete = (id, callback) => {
    "use strict";
    let table  = 'rames_picture';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete rames picture.',
              err     : err,
              data    : null,
              Message : 'Failed to delete rames picture.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete rames picture.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted rames picture successfully.'
            });
      }
    );
  };

  
}
module.exports = new RamesPicture();