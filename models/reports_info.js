const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
// READY BUT NEEDS TO TEST BETTER

function ReportsInfo() {
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
    let table  = 'reports_info';
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
              data    : result,
              Message : 'Returned all the reports information.'
            });
      }
    );
  };

  // Get all report information by id
  this.getReportsInfoByID = (id, callback) => {
    "use strict";
    let table  = 'reports_info';
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
              data    : result,
              Message : 'Returned report by information id.'
            });
      }
    );
  };

  // Get all report information by report id
  this.getReportsInfoByReportID = (reportID, callback) => {
    "use strict";
    let table  = 'reports_info';
    let string = 'SELECT * FROM '+ table + ' WHERE reportID = $1';
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
              data    : result,
              Message : 'Returned report information by report id.'
            });
      }
    );
  };

  // Get all report information for specific question by question id
  this.getReportsInfoByQuestionID = (questionID, callback) => {
    "use strict";
    let table  = 'reports_info';
    let string = 'SELECT * FROM '+ table + ' WHERE questionID = $1';
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
              data    : result,
              Message : 'Returned report information by question id.'
            });
      }
    );
  };

  // Return information about a specific question of a specific report
  this.getReportQuestionInfoByReportID = (data, callback) => {
    "use strict";
    let table  = 'reports_info';
    let string = 'SELECT * FROM '+ table + ' WHERE reportid = $1 and questionid = $2';
    let value  = [data.reportID, data.questionID]

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
              data    : result,
              Message : 'Returned report information by report id and question id.'
            });
      }
    );
  };

  // Add report information
  this.create = (data, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'INSERT INTO '+ table + '(ReportID, QuestionID, Answer) VALUES($1, $2, $3)';
    let value = [data.ReportID, data.QuestionID, data.Answer];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new report information.',
              err     : err,
              data    : null,
              Message : 'report information creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new report information.',
              err     : err,
              data    : result,
              Message : 'Report information created successfully.'
            });
      }
    );  
  };

  // Update specific report information
  this.update = (info, callback) => {
    "use strict";
    let update = stringBuilder.update("reports_info", "id" , info);
    dbService.queryStringValue(update.string, update.value, 
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
              data    : result,
              Message : 'Report information updated successfully.'
            });

      }
    );
  };

  // Delete the reports information with the given id
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
              data    : result,
              Message : 'Deleted report information successfully.'
            });
      }
    );
  };

  this.deleteReportInfoInReport = (reportID, callback) => {
    "use strict";
    let table  = 'reports';
    let string = 'DELETE FROM '+ table + ' WHERE reportID = $1';
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
              data    : result,
              Message : 'Deleted report information successfully.'
            });
      }
    );
  };

  
}
module.exports = new ReportsInfo();