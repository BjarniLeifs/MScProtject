const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const reportsType = require('./../DTO/reports_type');

function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(reportsType.DTO(data[i].id, data[i].name, data[i].info));

    return object;

}


function ReportType() {

  this.get = (callback) => {
    "use strict";
    let table  = 'reports_type';
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
              data    : DTO(result),
              Message : 'Returned all the reports type.'
            });
      }
    );
  };

  this.getReportTypeByID = (id, callback) =>  {
    "use strict";
    let table  = 'reports_type';
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
              data    : DTO(result),
              Message : 'Returned report by type id.'
            });
      }
    );  
  };

  this.getReportTypeByName = (name, callback) =>  {
    "use strict";
    let table  = 'reports_type';
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
              data    : DTO(result),
              Message : 'Returned report by type name.'
            });
      }
    ); 
  };

  this.create = (data, callback) =>  {
    "use strict";
    let table  = 'reports_type';
    let string = 'INSERT INTO '+ table + '(Name, Info) VALUES($1, $2)';
    let value = [data.Name, data.Info];

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
              data    : DTO(result),
              Message : 'Report type created successfully.'
            });
      }
    );  
  };

  this.update = (report_type, callback) =>  {
    "use strict";
/* Expected object to be:
  {
      data: the data,
      updateTable: name of the table to work with.
      where : the column to find that is updated..
      whereValue: The value of the where column is.
  }
*/

    let update = {
      data: report_type,
      updateTable: "reports_type",
      where: "id",
      whereValue: report_type.ID
    };

    stringBuilder.update(update, 
      (error, queryObject) => {
        if(error)
          callback(error, {
            valid   : false,
            status  : 412,
            Type    : 'Update Report type.',
            err     : err,
            data    : null,
            Message : 'Report type update failed, precondiction.'
          });
        else
          dbService.queryStringValue(queryObject.string, queryObject.value, 
            (err, result) => {
              
              if (err)
                callback(err, { 
                  valid   : false,
                  status  : 412,
                  Type    : 'Update Report type.',
                  err     : err,
                  data    : null,
                  Message : 'Report type update failed.'
                });
              else
              callback(err, { 
                valid   : true,
                status  : 200,
                Type    : 'Update Report type.',
                err     : err,
                data    : DTO(result),
                Message : 'Report type updated successfully.' 
              });
            }
        );     
      }

    );
  };

  this.delete = (id, callback) =>  {
    "use strict";
    let table  = 'reports_type';
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
              data    : DTO(result),
              Message : 'Deleted report type successfully.'
            });
      }
    );
  };

  
}
module.exports = new ReportType();