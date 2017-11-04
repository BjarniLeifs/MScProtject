const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const reportsInfo = require('./../DTO/feedback_reports_info');

function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(reportsInfo.DTO(data[i].id, data[i].FeedbackReportID, data[i].categoryid, data[i].FeedbackQuestionID,
                  data[i].answer));

    return object;

}

function ReportsInfo() {

  this.get = (callback) => {
    "use strict";
    let table  = 'feedback_reports_info';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the reports information.',
              err     : err,
              data    : null,
              Message : 'Failed to get the reports information'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the reports information.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the reports information.'
            });
      }
    );
  };


  // Get all report information by id
  this.getReportsInfoByID = (id, callback) => {
    "use strict";
    let table  = 'feedback_reports_info';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report information by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report information by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report by information id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned report by information id.'
            });
      }
    );
  };

  // Get all report information by report id
  this.getReportsInfoByReportID = (reportID, callback) => {
    "use strict";
    let table  = 'feedback_reports_info';
    let string = 'SELECT * FROM '+ table + ' WHERE FeedbackReportID = $1';
    let value  = [reportID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report information by report id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report information by report id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report information by report id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned report information by report id.'
            });
      }
    );
  };
  // Get all report information by report id and category id
  this.getReportsInfoByCategoryIdAndReportId = (categoryID, reportID, callback) => {
    "use strict";
    let table  = 'feedback_reports_info';
    let string = 'SELECT * FROM '+ table + ' WHERE FeedbackReportID = $1 and categoryid = $2' ;
    let value  = [reportID, categoryID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report information by report id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report information by report id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report information by report id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned report information by report id.'
            });
      }
    );
  };
  // Get all report information for specific question by question id
  this.getReportsInfoByQuestionID = (questionID, callback) => {
    "use strict";
    let table  = 'feedback_reports_info';
    let string = 'SELECT * FROM '+ table + ' WHERE FeedbackQuestionID = $1';
    let value  = [questionID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report information by question id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report information by question id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report information by question id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned report information by question id.'
            });
      }
    );
  };

  // Return information about a specific question of a specific report
  this.getReportQuestionInfoByReportID = (data, callback) => {
    "use strict";
    let table  = 'feedback_reports_info';
    let string = 'SELECT * FROM '+ table + ' WHERE FeedbackReportID = $1 and FeedbackQuestionID = $2';
    let value  = [data.FeedbackReportID, data.FeedbackQuestionID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report information by report id and question id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report information by report id and question id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report information by report id and question id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned report information by report id and question id.'
            });
      }
    );
  };



  // Add report information
  this.create = (reportID, callback) => {
    "use strict";
    let value = [];
    let prepareTable  = 'rames_feedback_questions';
    let prepareString = 'SELECT * FROM ' + prepareTable;
    let i;
    let rid = parseInt(reportID, 10);
    let error;
    /* 
      Getting all the rames question to make rames info for them all. 
    */
    dbService.queryString(prepareString, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new report information.',
              err     : err,
              data    : null,
              Message : 'Populating rames questions for project failed.'
            });
       
        else {
          for (i = 0; i < result.length; i++) {   
            /* 
              After getting all the information for each question I populate it to database in mass
              Such as it can be updated afterwards to simplafy coding in frontent.
            */
            let table  = 'feedback_reports_info';
            let string = 'INSERT INTO '+ table + '(FeedbackReportID, FeedbackQuestionID, categoryid, answer) VALUES ($1, $2, $3, $4) ';
            let emptyJson = {};
            dbService.queryStringValue(string, 
              [rid, result[i].id, result[i].categoryid, emptyJson], 
              (err, result) => {
                if (err) {
                  error = err;
                  i = result.length;
                }
              }
            );
          }
        }
      }
    );  
  if (error)
      callback(error, 
        { 
          valid   : false,
          status  : 412,
          Type    : 'Create new report information.',
          err     : error,
          data    : null,
          Message : 'report information creation failed.'
        });
  else  {

      callback(error, 
        { 
          valid   : true,
          status  : 200,
          Type    : 'Create new report information.',
          err     : error,
          data    : null,
          Message : 'Returned report by information id.'
        });
   }         
  };

  // Update specific report information
  this.update = (info, callback) => {
    "use strict";
    let table = 'feedback_reports_info';
    let string = "UPDATE " + table + " SET Answer = $1 WHERE ID = $2 and FeedbackReportID = $3 and FeedbackQuestionID = $4 returning *";
    let value = [info.Answer, info.ID, info.FeedbackReportID, info.FeedbackQuestionID];
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update Report information.',
              err     : err,
              data    : null,
              Message : 'Report information update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update Report information.',
              err     : err,
              data    : DTO(result),
              Message : 'Report information updated successfully.'
            });

      }
    );
  };

  // Delete the reports information with the given id
  this.delete = (id, callback) => {
    "use strict";
    let table  = 'feedback_reports_info';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete report information.',
              err     : err,
              data    : null,
              Message : 'Failed to delete report information.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete report information.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted report information successfully.'
            });
      }
    );
  };

  this.deleteReportInfoInReport = (reportID, callback) => {
    "use strict";
    let table  = 'feedback_reports_info';
    let string = 'DELETE FROM '+ table + ' WHERE FeedbackReportID = $1';
    let value  = [reportID];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete report information.',
              err     : err,
              data    : null,
              Message : 'Failed to delete report information.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete report information.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted report information successfully.'
            });
      }
    );
  };


  
}
module.exports = new ReportsInfo();