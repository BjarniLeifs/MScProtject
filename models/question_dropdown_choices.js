const stringBuilder = require('./../library/queryBuilder');
// READY BUT NEEDS TO TEST BETTER

function DropdownChoice() {


  this.get = (callback) => {
    "use strict";
    let table  = 'question_dropdown_choices';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All question dropdown choices.',
              err     : err,
              data    : null,
              Message : 'Failed to get question dropdown choices.'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All question dropdown choices.',
              err     : err,
              data    : result,
              Message : 'Returned all question dropdown choices.'
            });
      }
    );    
  };

  this.getDropdownChoiceByID = (id, callback) => {
    "use strict";
    let table  = 'question_dropdown_choices';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting question dropdown choices by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get question dropdown choices by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting question dropdown choices by id.',
              err     : err,
              data    : result,
              Message : 'Returned question dropdown choices by id.'
            });
      }
    );
  };


  this.create = function(choice, callback) {
    "use strict";
    let table  = 'question_dropdown_choices';
    let string = 'INSERT INTO '+ table + '(QuestionID, Choice, Cond, Textbox) VALUES($1, $2, $3, $4)';
    let value = [object.QuestionID, object.Choice, object.Cond, object.Textbox];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Create new Question dropdown choice.',
              err     : err,
              data    : null,
              Message : 'Question dropdown choice creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Question dropdown choice.',
              err     : err,
              data    : result,
              Message : 'Question dropdown choice created successfully.'
            });
      }
    );  
  };

  this.update = (choice, callback) => {
    "use strict";
    let update = stringBuilder.update("question_dropdown_choices", "id" , choice);
    
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Update question dropdown choice.',
              err     : err,
              data    : null,
              Message : 'Question dropdown choice update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update question dropdown choice.',
              err     : err,
              data    : result,
              Message : 'Question dropdown choice updated successfully.'
            });

      }
    );
  };

  this.delete = (id, callback) => {
    "use strict";
    let table  = 'question_dropdown_choices';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id]   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Delete question dropdown choice.',
              err     : err,
              data    : null,
              Message : 'Failed to delete question dropdown choice.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete question dropdown choice.',
              err     : err,
              data    : result,
              Message : 'Deleted question dropdown choice successfully.'
            });
      }
    );
  };

  
}
module.exports = new DropdownChoice();