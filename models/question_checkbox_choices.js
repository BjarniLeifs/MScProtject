
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');

function CheckboxChoice() {
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
    let table  = 'question_checkbox_choices';
    let string = 'SELECT * FROM ' + table;
    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All choices.',
              err     : err,
              data    : null,
              Message : 'Failed to get choices'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All choices.',
              err     : err,
              data    : result,
              Message : 'Returned all choices.'
            });
      }
    );
  };

  this.getCheckboxChoiceByID = (id, callback) => {
    "use strict";
    let table  = 'question_checkbox_choices';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting question checkbox choices by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get question checkbox choices by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting question checkbox choices by id.',
              err     : err,
              data    : result,
              Message : 'Returned question checkbox choices by id.'
            });
      }
    );
  };

  this.create = (object, callback) => {

    "use strict";
    let table  = 'question_checkbox_choices';
    let string = 'INSERT INTO '+ table + '(QuestionID, Choice, Textbox) VALUES($1, $2, $3)';
    let value = [object.QuestionID, object.Choice, object.Textbox];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Create new Question checkbox choice.',
              err     : err,
              data    : null,
              Message : 'Question checkbox choice creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Question checkbox choice.',
              err     : err,
              data    : result,
              Message : 'Question checkbox choice created successfully.'
            });
      }
    );  
  };

  this.update = (choice, callback) => {
    "use strict";
    let update = stringBuilder.update("question_checkbox_choices", "id" , choice);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Update question checkbox choice.',
              err     : err,
              data    : null,
              Message : 'Question checkbox choice update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update question checkbox choice.',
              err     : err,
              data    : result,
              Message : 'Question checkbox choice updated successfully.'
            });

      }
    );
  };

  this.delete = (id, callback) => {
    "use strict";
    let table  = 'question_checkbox_choices';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id]   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Delete question checkbox choice.',
              err     : err,
              data    : null,
              Message : 'Failed to delete question checkbox choice.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete question checkbox choice.',
              err     : err,
              data    : result,
              Message : 'Deleted question checkbox choice successfully.'
            });
      }
    );
  };

  
}
module.exports = new CheckboxChoice();