const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const reports = require('./../DTO/feedback_reports');
const reportsinfo = require('./feedback_reports_info');
const userService = require('./users');
function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(reports.DTO(data[i].id, data[i].userid, data[i].name,
                  data[i].reporttypeid, data[i].createdat, data[i].lastupdate, data[i].finished));

    return object;

}

function Report() {

  this.get = (uid, callback) => {
    "use strict";
    let table  = 'feedback_reports';
    let string = 'SELECT * FROM '+ table + ' WHERE userid = $1';
    let value  = [uid]
    dbService.queryStringValue(string, value,
      (err, result) => {    
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the feedback reports.',
              err     : err,
              data    : null,
              Message : 'Failed to get the feedback reports'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the feedback reports.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the feedback reports.'
            });
      }
    );
  };

  // Return the report with the given id
  this.getReportByID = (id, callback) => {
    "use strict";
    let table  = 'feedback_reports';
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
              Message : 'Failed to get the feedback report by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report by id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned feedback reports by id.'
            });
      }
    );
  };
  this.getReportByProjectId = (pid, uid, callback) => {
    "use strict";
    let table  = 'feedback_reports';
    let string = 'SELECT * FROM '+ table + ' WHERE projectid = $1 and userid = $2';
    let value  = [pid, uid]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting feedback report by projectid.',
              err     : err,
              data    : null,
              Message : 'Failed to get the feedback report by projectid'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting feedback report by projectid.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned feedback reports by projectid.'
            });
      }
    );
  }
  // Return all reports that the user with the given ID has
  this.getReportsByUserID = (userID, callback) => {
    "use strict";
    let table  = 'feedback_reports';
    let string = 'SELECT * FROM '+ table + ' WHERE userID = $1';
    let value  = [userID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting feedback report user by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the feedback report user by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the feedback report by id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned feedback reports by id.'
            });
      }
    );
  };

  // Return all reports of the user with the given report type id
  this.getReportsByReportTypeID = (data, callback) => {
    "use strict";
    let table  = 'feedback_reports';
    let string = 'SELECT * FROM '+ table + ' WHERE userid = $1 and reporttypeid = $2';
    let value  = [data.userID, data.reportTypeID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting feedback report by user id and report type id.',
              err     : err,
              data    : null,
              Message : 'Failed to get feedback report by user id and report type id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting feedback report by user id and report type id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned feedback report by user id and report type id.'
            });
      }
    );
  };

  this.create = (data, uid, callback) => {
    "use strict";
    let date = new Date();
    let table  = 'feedback_reports';
    let string = 'INSERT INTO '+ table + '(UserID, Name, ReportTypeID, ProjectID, Finished, CreatedAt, LastUpdate) VALUES($1, $2, $3, $4, $5, $6) returning *';
    let value = [uid, data.Name, data.ReportTypeID, data.ProjectID, false, date, date];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new feedback report.',
              err     : err,
              data    : null,
              Message : 'feedback report creation failed.'
            });
        else {
          reportsinfo.create(result[0].id, 
            (err, results) => {
              if (err)
                callback(err, 
                {
                  valid   : false,
                  status  : 412,
                  Type    : 'Create new feedback report info for report.',
                  err     : err,
                  data    : null,
                  Message : 'feedback report info creation failed for report.'
                });
            });
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new feedback report.',
              err     : err,
              data    : DTO(result),
              Message : 'feedback Report created successfully.'
            });
        }
      }
    );  
  };

  this.update = (report, callback) => {
    "use strict";
    let update = stringBuilder.update("feedback_reports", "id" , report);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update feedback Report.',
              err     : err,
              data    : null,
              Message : 'Feedback report update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update feedback Report.',
              err     : err,
              data    : DTO(result),
              Message : 'Feedback report updated successfully.'
            });

      }
    );
  };

  this.delete = (req, id, callback) => {
    "use strict";
    let table  = 'feedback_reports';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];  

    userService.userOwnsReportWithId(req, id,
      (err, valid) => {
        if (err)
          callback(err, 
            {
              valid   : false,
              status  : 404,
              Type    : 'Delete feedback report faild on authentication.',
              err     : err,
              data    : null,
              Message : 'Failed to delete feedback report id by userid. Authentication faild.'            
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
                    Type    : 'Delete feedback report.',
                    err     : err,
                    data    : null,
                    Message : 'Failed to delete feedback report.'
                  });
              else  {
                reportsinfo.deleteReportInfoInReport(id, 
                  (err, reports) => {
                    if (err)
                      callback (err,
                      {
                        valid   : false,
                        status  : 404,
                        Type    : 'Delete feedback report infos by report id.',
                        err     : err,
                        data    : null,
                        Message : 'Failed to delete feedback reports info by report id.'
                      })
                    else
                     callback(err,
                      { 
                        valid   : true,
                        status  : 200,
                        Type    : 'Delete feedback report.',
                        err     : err,
                        data    : DTO(result),
                        Message : 'Deleted feedback report successfully.'
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