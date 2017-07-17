const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
// READY BUT NEEDS TO TEST BETTER

function Report() {
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
    let table  = 'reports';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the reports.',
              err     : err,
              data    : null,
              Message : 'Failed to get the reports'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the reports.',
              err     : err,
              data    : result,
              Message : 'Returned all the reports.'
            });
      }
    );
  };

  // Return the report with the given id
  this.getReportByID = (id, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report by id.',
              err     : err,
              data    : result,
              Message : 'Returned reports by id.'
            });
      }
    );
  };

  // Return all reports that the user with the given ID has
  this.getReportsByUserID = (userID, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'SELECT * FROM '+ table + ' WHERE userID = $1';
    let value  = [userID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report user by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report user by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report by id.',
              err     : err,
              data    : result,
              Message : 'Returned reports by id.'
            });
      }
    );
  };

  // Return all reports of the user with the given report type id
  this.getReportsByReportTypeID = (data, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'SELECT * FROM '+ table + ' WHERE userid = $1 and reporttypeid = $2';
    let value  = [data.userID, data.reportTypeID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report by user id and report type id.',
              err     : err,
              data    : null,
              Message : 'Failed to get report by user id and report type id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting report by user id and report type id.',
              err     : err,
              data    : result,
              Message : 'Returned report by user id and report type id.'
            });
      }
    );
  };

  this.create = (data, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'INSERT INTO '+ table + '(UserID, Name, ReportTypeID) VALUES($1, $2, $3)';
    let value = [data.UserID, data.Name, data.ReportTypeID];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new report.',
              err     : err,
              data    : null,
              Message : 'report creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new report.',
              err     : err,
              data    : result,
              Message : 'Report created successfully.'
            });
      }
    );  
  };

  this.update = (report, callback) => {
    "use strict";
    let update = stringBuilder.update("reports", "id" , report);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update Report.',
              err     : err,
              data    : null,
              Message : 'Report update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update Report.',
              err     : err,
              data    : result,
              Message : 'Report updated successfully.'
            });

      }
    );
  };

  this.delete = (id, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete report.',
              err     : err,
              data    : null,
              Message : 'Failed to delete report.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete report.',
              err     : err,
              data    : result,
              Message : 'Deleted report successfully.'
            });
      }
    );
  };


}
module.exports = new Report();