
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const ramesCatgeroy = require('./../DTO/rames_category');
function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(ramesCatgeroy.DTO(data[i].id, data[i].category, 
                  data[i].info, data[i].languageid, data[i].sequencenumber));

    return object;

}

function ReportsCategory() {

  this.get = (callback) => {
    "use strict";
    let table  = 'rames_category';
    let string = 'SELECT * FROM ' + table;
    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the rames categories.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames categories'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the rames categories.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the rames categories.'
            });
      }
    );
  };


  this.getOrderedCategory = (callback) => {
    "use strict";
    let table  = 'rames_category';
    let string = 'SELECT * FROM ' + table + ' order by sequenceNumber ASC';

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the rames categories by sequence number.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames category by sequence number'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the rames categories by sequence number.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the rames categories by sequence number.'
            });
      }
    );
  };

  // Get a rames category by id
  this.getRamesCategoryByID = (id, callback) => {
    "use strict";
    let table  = 'rames_category';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting rames category by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames category by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames category by id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames category by id.'
            });
      }
    );
  };

  // Get a all rames categories by language id
  this.getAllRamesCategoryByLanguageID = (languageID, callback) => {
    "use strict";
    let table  = 'rames_category';
    let string = 'SELECT * FROM '+ table + ' WHERE languageid = $1';
    let value  = [languageID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting question radio choices by language id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames category by language id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames category by language id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames category by language id.'
            });
      }
    );
  };

  this.getRamesCategoryByLanguageID = (data, callback) => {
    "use strict";
    let table  = 'rames_category';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1 and languageid = $2';
    let value  = [data.id, data.languageID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting rames category by category id and language id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames category by category id and language id.'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting rames category by category id and language id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames category by category id and language id.'
            });
      }
    );
  };

  // Add report information
  this.create = (data, callback) => {
    "use strict";
    let table  = 'question_radio_choices';
    let string = 'INSERT INTO '+ table + '(category, info, languageID, sequenceNumber) VALUES($1, $2, $3, $4)';
    let value = [data.category, data.info, data.languageID, data.sequenceNumber];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new Rames category.',
              err     : err,
              data    : null,
              Message : 'Rames category creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Rames category.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames category created successfully.'
            });
      }
    );  
  };

  // Update specific report information
  this.update = (data, callback) => {
    "use strict";
    let update = stringBuilder.update("rames_category", "id" , data);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update Rames category update.',
              err     : err,
              data    : null,
              Message : 'Rames category update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update Rames category update.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames category updated successfully.'
            });

      }
    );
  };

  // Delete the reports information with the given id
  this.delete = (id, callback) => {
    "use strict";
    let table  = 'rames_category';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete rames category.',
              err     : err,
              data    : null,
              Message : 'Failed to delete rames category.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete rames category.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted rames category successfully.'
            });
      }
    );
  };

  
}
module.exports = new ReportsCategory();