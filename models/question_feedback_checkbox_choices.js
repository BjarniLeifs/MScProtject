
const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const qfCheckChoies = require('./../DTO/question_feekback_checkbox_choices');
function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(qfCheckChoies.DTO(data[i].id, data[i].questionid, 
                  data[i].choice));

    return object;

}
function CheckboxChoice() {


  this.get = (callback) => {
    "use strict";
    let table  = 'question_feedback_checkbox_choices';
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
              data    : DTO(result),
              Message : 'Returned all choices.'
            });
      }
    );
  };

  this.getCheckboxChoiceByID = (id, callback) => {
    "use strict";
    let table  = 'question_feedback_checkbox_choices';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting question checkbox feedback choices by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get question checkbox feedback choices by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting question checkbox feedbackchoices by id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned question checkbox feedback choices by id.'
            });
      }
    );
  };
  this.getCheckboxChoiceByQuestionID = (qid, callback) => {
    "use strict";
    
    let table  = 'question_feedback_checkbox_choices';
    let string = 'SELECT * FROM '+ table + ' WHERE questionid = $1';
    let value  = [qid]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting question checkbox  feedback choices by questionid.',
              err     : err,
              data    : null,
              Message : 'Failed to get question checkbox feedback choices by questionid'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting question checkbox feedback choices by questionid.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned question checkbox feedback choices by questionid.'
            });
      }
    );
  };

  this.create = (object, callback) => {

    "use strict";
    let table  = 'question_feedback_checkbox_choices';
    let string = 'INSERT INTO '+ table + '(QuestionID, Choice) VALUES($1, $2)';
    let value = [object.QuestionID, object.Choice];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Create new Question checkbox feedback choice.',
              err     : err,
              data    : null,
              Message : 'Question checkbox feedback choice creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Question checkbox feedback choice.',
              err     : err,
              data    : DTO(result),
              Message : 'Question checkbox feedback choice created successfully.'
            });
      }
    );  
  };

  this.update = (choice, callback) => {
    "use strict";
    let update = stringBuilder.update("question_feedback_checkbox_choices", "id" , choice);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Update question checkbox feedback choice.',
              err     : err,
              data    : null,
              Message : 'Question checkbox feedback choice update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update question checkbox feedback choice.',
              err     : err,
              data    : DTO(result),
              Message : 'Question checkbox feedback choice updated successfully.'
            });

      }
    );
  };

  this.delete = (id, callback) => {
    "use strict";
    let table  = 'question_feedback_checkbox_choices';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id]   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Delete question checkbox feedback choice.',
              err     : err,
              data    : null,
              Message : 'Failed to delete question checkbox feedback choice.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete question checkbox feedback choice.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted question checkbox feedback choice successfully.'
            });
      }
    );
  };

  
}
module.exports = new CheckboxChoice();