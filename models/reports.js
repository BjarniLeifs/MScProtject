const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const reports = require('./../DTO/reports');
const reportsinfo = require('./reports_info');
const userService = require('./users');
function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(reports.DTO(data[i].id, data[i].userid, data[i].name,
                  data[i].reporttypeid, data[i].createdat, data[i].lastupdate));

    return object;

}

function Report() {

  this.get = (uid, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'SELECT * FROM '+ table + ' WHERE userid = $1';
    let value  = [uid]
    dbService.queryStringValue(string, value,
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
              data    : DTO(result),
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
              data    : DTO(result),
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
              data    : DTO(result),
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
              data    : DTO(result),
              Message : 'Returned report by user id and report type id.'
            });
      }
    );
  };

  this.create = (data, uid, callback) => {
    "use strict";
    let date = new Date();
    let table  = 'reports';
    let string = 'INSERT INTO '+ table + '(UserID, Name, ReportTypeID, ProjectID, CreatedAt, LastUpdate) VALUES($1, $2, $3, $4, $5, $6) returning *';
    let value = [uid, data.Name, data.ReportTypeID, data.ProjectID, date, date];

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
        else {
          reportsinfo.create(result[0].id, 
            (err, results) => {
              if (err)
                callback(err, 
                {
                  valid   : false,
                  status  : 412,
                  Type    : 'Create new report info for report.',
                  err     : err,
                  data    : null,
                  Message : 'report info creation failed for report.'
                });
            });
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new report.',
              err     : err,
              data    : DTO(result),
              Message : 'Report created successfully.'
            });
        }
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
              data    : DTO(result),
              Message : 'Report updated successfully.'
            });

      }
    );
  };

  this.delete = (req, id, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];  

    userService.userOwnsReportWithId(req, id,
      (err, valid) => {
        if (err)
          callback(err, 
            {
              valid   : false,
              status  : 404,
              Type    : 'Delete report faild on authentication.',
              err     : err,
              data    : null,
              Message : 'Failed to delete report id by userid. Authentication faild.'            
            });
        // Need to implament what to do with error. 
        else
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
              else  {
                reportsinfo.deleteReportInfoInReport(id, 
                  (err, reports) => {
                    if (err)
                      callback (err,
                      {
                        valid   : false,
                        status  : 404,
                        Type    : 'Delete report infos by report id.',
                        err     : err,
                        data    : null,
                        Message : 'Failed to delete reports info by report id.'
                      })
                    else
                     callback(err,
                      { 
                        valid   : true,
                        status  : 200,
                        Type    : 'Delete report.',
                        err     : err,
                        data    : DTO(result),
                        Message : 'Deleted report successfully.'
                      });                 
                });
              }
            }
          );
      }
    );
  };

}
module.exports = new Report();