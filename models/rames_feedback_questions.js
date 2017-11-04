const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const ramesQuestions = require('./../DTO/rames_feedback_questions');

function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(ramesQuestions.DTO(data[i].id, data[i].categoryid, data[i].question,
                  data[i].questionnr, data[i].type, data[i].languageid));

    return object;

}


function RamesQuestions() {

  this.get = (callback) => {
    "use strict";
    let table  = 'rames_feedback_questions';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the rames feedback questions.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames feedback questions'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the rames feedback questions.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the rames feedback questions.'
            });
      }
    );
  };

  // Get a rames question by id
  this.getRamesQuestionByID = (id, callback) => {
    "use strict";
    let table  = 'rames_feedback_questions';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting rames feedback question by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames feedback question by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames feedback question by id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames feedback question by id.'
            });
      }
    );
  };

  // Get all rames question by category id
  this.getRamesQuestionByCategoryID = (categoryID, callback) => {
    "use strict";
    let table  = 'rames_feedback_questions';
    let string = 'SELECT * FROM '+ table + ' WHERE categoryID = $1';
    let value  = [categoryID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting rames feedback question by category id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames feedback question by category id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames feedback question by category id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames feedback question by category id.'
            });
      }
    );
  };

  // Get all rames question by languageID
  this.getRamesQuestionByLanguageID = (languageID, callback) => {
    "use strict";
    let table  = 'rames_feedback_questions';
    let string = 'SELECT * FROM '+ table + ' WHERE languageID = $1';
    let value  = [languageID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting rames feedback question by language id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames feedback question by language id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames feedback question by language id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames feedback question by language id.'
            });
      }
    );
  };
 
  // Add rames question
  this.create = (data, callback) => {
    "use strict";
    let table  = 'rames_feedback_questions';
    let string = 'INSERT INTO '+ table + '(CategoryID, Question, QuestionNr, Type, LanguageID) VALUES($1, $2, $3, $4, $5)';
    let value = [data.CategoryID, data.Question, data.QuestionNr, data.Type, data.LanguageID];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new Rames feedback question.',
              err     : err,
              data    : null,
              Message : 'Rames feedback question creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Rames feedback question.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames feedback question created successfully.'
            });
      }
    );  
  };

  // Update specific rames question
  this.update = (questions, callback) => {
    "use strict";
    let update = stringBuilder.update("rames_feedback_questions", "id" , questions);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update Rames feedback question.',
              err     : err,
              data    : null,
              Message : 'Rames feedback question update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update Rames feedback question.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames feedback question updated successfully.'
            });

      }
    );
  };

  // Delete the rames question with the given id
  this.delete = (id, callback) => {
    "use strict";
    let table  = 'rames_feedback_questions';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete rames feedback question.',
              err     : err,
              data    : null,
              Message : 'Failed to delete rames feedback question.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete rames feedback question.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted rames feedback question successfully.'
            });
      }
    );
  };

  
}
module.exports = new RamesQuestions();