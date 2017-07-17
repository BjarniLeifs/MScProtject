
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
// READY BUT NEEDS TO TEST BETTER

function RadioChoice() {
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
    let table  = 'question_radio_choices';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All question radio choices.',
              err     : err,
              data    : null,
              Message : 'Failed to get question radio choices'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All question radio choices.',
              err     : err,
              data    : result,
              Message : 'Returned all question radio choices.'
            });
      }
    );
  };

  this.getRadioChoiceByID = (id, callback) => {
    "use strict";
    let table  = 'question_radio_choices';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting question radio choices by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get question radio choices by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting question radio choices by id.',
              err     : err,
              data    : result,
              Message : 'Returned question radio choices by id.'
            });
      }
    );
  };

  this.create = (choice, callback) => {
    "use strict";
    let table  = 'question_radio_choices';
    let string = 'INSERT INTO '+ table + '(QuestionID, Choice, Textbox) VALUES($1, $2, $3)';
    let value = [object.QuestionID, object.Choice, object.Textbox];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Create new Question radio choice.',
              err     : err,
              data    : null,
              Message : 'Question radio choice creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Question radio choice.',
              err     : err,
              data    : result,
              Message : 'Question radio choice created successfully.'
            });
      }
    );  
  };

  this.update = (choice, callback) => {
    "use strict";
    let update = stringBuilder.update("question_radio_choices", "id" , choice);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Update question radio choice.',
              err     : err,
              data    : null,
              Message : 'Question radio choice update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update question radio choice.',
              err     : err,
              data    : result,
              Message : 'Question radio choice updated successfully.'
            });
      }
    );
  };

  this.delete = (id, callback) =>  {
    "use strict";
    let table  = 'question_radio_choices';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Delete question radio choice.',
              err     : err,
              data    : null,
              Message : 'Failed to delete question radio choice.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete question radio choice.',
              err     : err,
              data    : result,
              Message : 'Deleted question radio choice successfully.'
            });
      }
    );

  };

  
}
module.exports = new RadioChoice();