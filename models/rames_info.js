
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const ramesinfo = require('./../DTO/rames_info');

function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(ramesinfo.DTO(data[i].id, data[i].name, data[i].info,
                  data[i].questionexplanation, data[i].languageid, 
                  data[i].categoryid));

    return object;

}

function RamesInfo() {

  this.get = (callback) => {
    "use strict";
    let table  = 'rames_info';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {

        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the rames information.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames information'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the rames information.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the rames information.'
            });
      }
    );
  };

  // Get all rames information by id
  this.getRamesInfoByID = (id, callback) => {
    "use strict";
    let table  = 'rames_info';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting question the rames information by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames information by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames information by id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned the rames information by id.'
            });
      }
    );
  };

  // Get all rames information by category id
  this.getRamesInfoByCategoryID = (categoryID, callback) => {
    "use strict";
    let table  = 'rames_info';
    let string = 'SELECT * FROM '+ table + ' WHERE categoryID = $1';
    let value  = [categoryID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting question the rames information by category id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames information by category id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames information by category id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned the rames information by category id.'
            });
      }
    );
  };

  // Get all rames information by languageID
  this.getRamesInfoByLanguageID = (languageID, callback) => {
    "use strict";
    let table  = 'rames_info';
    let string = 'SELECT * FROM '+ table + ' WHERE languageID = $1';
    let value  = [languageID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting question the rames information by language id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames information by language id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames information by language id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned the rames information by language id.'
            });
      }
    );
  };

  // Add rames information
  this.create = (data, callback) => {
    "use strict";
    let table  = 'rames_info';
    let string = 'INSERT INTO '+ table + '(Name, Info, QuestionExplanation, LanguageID, CategoryID) VALUES($1, $2, $3, $4, $5)';
    let value = [data.Name, data.Info, data.QuestionExplanation, data.LanguageID, data.CategoryID];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new Rames information.',
              err     : err,
              data    : null,
              Message : 'Rames information creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Rames information.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames information creation failed created successfully.'
            });
      }
    );
  };

  // Update specific rames information
  this.update = (info, callback) => {
    "use strict";
    let update = stringBuilder.update("rames_info", "id" , info);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update Rames information update.',
              err     : err,
              data    : null,
              Message : 'Rames information update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update Rames information update.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames information updated successfully.'
            });
      }
    );
  };

  // Delete the rames information with the given id
  this.delete = (id, callback) => {
    "use strict";
    let table  = 'rames_info';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete rames information.',
              err     : err,
              data    : null,
              Message : 'Failed to delete rames information.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete rames information.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted rames information successfully.'
            });
      }
    );
  };


  
}




const myself = module.exports = new RamesInfo();




