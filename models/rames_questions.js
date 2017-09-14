const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const ramesQuestions = require('./../DTO/rames_questions');

function DTO(data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(ramesQuestions.DTO(data[i].id, data[i].categoryid, data[i].question,
                  data[i].suggestion, data[i].questionnr, data[i].type, 
                  data[i].languageid, data[i].ramesinfoid));

    return object;

}


function RamesQuestions() {

  this.get = (callback) => {
    "use strict";
    let table  = 'rames_questions';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the rames questions.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames questions'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the rames questions.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the rames questions.'
            });
      }
    );
  };

  // Get a rames question by id
  this.getRamesQuestionByID = (id, callback) => {
    "use strict";
    let table  = 'rames_questions';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting rames question by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames question by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames question by id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames question by id.'
            });
      }
    );
  };

  // Get all rames question by category id
  this.getRamesQuestionByCategoryID = (categoryID, callback) => {
    "use strict";
    let table  = 'rames_questions';
    let string = 'SELECT * FROM '+ table + ' WHERE categoryID = $1';
    let value  = [categoryID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting rames question by category id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames question by category id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames question by category id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames question by category id.'
            });
      }
    );
  };

  // Get all rames question by languageID
  this.getRamesQuestionByLanguageID = (languageID, callback) => {
    "use strict";
    let table  = 'rames_questions';
    let string = 'SELECT * FROM '+ table + ' WHERE languageID = $1';
    let value  = [languageID]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting rames question by language id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the rames question by language id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the rames question by language id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned rames question by language id.'
            });
      }
    );
  };
 
  // Add rames question
  this.create = (data, callback) => {
    "use strict";
    let table  = 'question_radio_choices';
    let string = 'INSERT INTO '+ table + '(CategoryID, Question, Suggestion, QuestionNr, Type, LanguageID, RamesInfoID) VALUES($1, $2, $3, $4, $5, $6, $7)';
    let value = [data.CategoryID, data.Question, data.Suggestion, data.QuestionNr, data.Type, data.LanguageID, data.RamesInfoID];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new Rames question.',
              err     : err,
              data    : null,
              Message : 'Rames question creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new Rames question.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames question created successfully.'
            });
      }
    );  
  };

  // Update specific rames question
  this.update = (questions, callback) => {
    "use strict";
    let update = stringBuilder.update("rames_questions", "id" , questions);
    dbService.queryStringValue(update.string, update.value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Update Rames question.',
              err     : err,
              data    : null,
              Message : 'Rames question update failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Update Rames question.',
              err     : err,
              data    : DTO(result),
              Message : 'Rames question updated successfully.'
            });

      }
    );
  };

  // Delete the rames question with the given id
  this.delete = (id, callback) => {
    "use strict";
    let table  = 'rames_questions';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete rames question.',
              err     : err,
              data    : null,
              Message : 'Failed to delete rames question.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete rames question.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted rames question successfully.'
            });
      }
    );
  };

  
}
module.exports = new RamesQuestions();