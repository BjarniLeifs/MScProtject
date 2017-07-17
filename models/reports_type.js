const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
// READY BUT NEEDS TO TEST BETTER


function ReportType() {
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
    let table  = 'report_type';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the reports type.',
              err     : err,
              data    : null,
              Message : 'Failed to get the reports type'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the reports type.',
              err     : err,
              data    : result,
              Message : 'Returned all the reports type.'
            });
      }
    );
  };

  this.getReportTypeByID = (id, callback) =>  {
    "use strict";
    let table  = 'report_type';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report type by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report type by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report by type id.',
              err     : err,
              data    : result,
              Message : 'Returned report by type id.'
            });
      }
    );  
  };

  this.getReportTypeByName = (name, callback) =>  {
    "use strict";
    let table  = 'report_type';
    let string = 'SELECT * FROM '+ table + ' WHERE name = $1';
    let value  = [name]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting report type by name.',
              err     : err,
              data    : null,
              Message : 'Failed to get the report type by name'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the report by type name.',
              err     : err,
              data    : result,
              Message : 'Returned report by type name.'
            });
      }
    ); 
  };

  this.create = (data, callback) =>  {
    "use strict";
    let table  = 'reports';
    let string = 'INSERT INTO '+ table + '(Name, Info, Answer) VALUES($1, $2, $3)';
    let value = [data.ReportID, data.QuestionID, data.Answer];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new report type.',
              err     : err,
              data    : null,
              Message : 'Report type creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new report type.',
              err     : err,
              data    : result,
              Message : 'Report type created successfully.'
            });
      }
    );  
  };

  this.update = (report_type, callback) =>  {
    "use strict";
    let update = stringBuilder.update("report_type", "id" , report_type);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update Report type.',
              err     : err,
              data    : null,
              Message : 'Report type update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update Report type.',
              err     : err,
              data    : result,
              Message : 'Report type updated successfully.'
            });

      }
    );
  };

  this.delete = (id, callback) =>  {
    "use strict";
    let table  = 'report_type';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete report type.',
              err     : err,
              data    : null,
              Message : 'Failed to delete report type.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete report type.',
              err     : err,
              data    : result,
              Message : 'Deleted report type successfully.'
            });
      }
    );
  };

  
}
module.exports = new ReportType();