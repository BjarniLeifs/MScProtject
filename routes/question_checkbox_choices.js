const express = require('express');
const router = express.Router();
const qccService = require('./../models/question_checkbox_choices');
/**
 * @api {get} /api/questioncheckboxchoices Get Question checkbox choices.
 * @apiVersion 1.0.0
 * @apiName GetQCC
 * @apiGroup Question checkbox choices
 *
 * @apiDescription Returns a list of all question checkbox choices.
 *
 * @apiParam {None}  - 			No parameters required.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/questioncheckboxchoices
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 *      {
 * 		   Id 		  : 1,
 *		   QuestionID : 1,
 * 		   Chooices   : "some strings",
 *		   Textbox    : "some text"
 *      },
 *		 ....
 * 	   }
 *
 */
router.get('/',  (req, res) => {
	"user strict";
	qccService.get(
		(err, result) => {
			if (err)
				return res.status(result.status)
						.json({ message: result.message });
			else 
				return res.status(result.status)
						.json( result.data );
  	}
  );
});
/**
 * @api {get} /api/questioncheckboxchoices/:id Get Question checkbox choices by id.
 * @apiVersion 1.0.0
 * @apiName GetQCCid
 * @apiGroup Question checkbox choices
 *
 * @apiDescription Returns the info of a question checkbox choices with the given id.
 *
 * @apiParam {Number}  id		The id of question checkbox choices.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/questioncheckboxchoices/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 * 		   Id 		  : 1,
 *		   QuestionID : 1,
 * 		   Chooices   : "some strings",
 *		   Textbox    : "some text"
 * 	   }
 *
 */
router.get('/:id', (req, res) => {
	"user strict";
	if (!req.params.id)
		return res.status(400)
				.json({ message: "Please provide id." });

	qccService.getCheckboxChoiceByID(req.params.id,
		(err, result) => {
			if (err)
				return res.status(result.status)
						.json({ message: result.message });
			else 
				return res.status(result.status)
						.json( result.data );
  	}
  );
});
router.get('/question/:id', (req, res) => {
	"user strict";
	
	if (!req.params.id)
		return res.status(400)
				.json({ message: "Please provide id." });

	qccService.getCheckboxChoiceByQuestionID(req.params.id,
		(err, result) => {
			if (err)
				return res.status(result.status)
						.json({ message: result.message });
			else 
				return res.status(result.status)
						.json( result.data );
  		}
  	);
});
/**
 * @api {post} /api/questioncheckboxchoices Adds Question checkbox choices.
 * @apiVersion 1.0.0
 * @apiName GetQCCadd
 * @apiGroup Question checkbox choices
 *
 * @apiDescription Adds a new question checkbox choices to the database
 *
 * @apiParam {Number}  QuestionID	The id of question.
 * @apiParam {String}  Chooices		The chooices of question.
 * @apiParam {String}  Textbox		The information about the question.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X post http://localhost:3001/api/questioncheckboxchoices
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 * 		   Id 		  : 1,
 *		   QuestionID : 1,
 * 		   Chooices   : "some strings",
 *		   Textbox    : "some text"
 * 	   }
 *
 */
router.post('/', (req, res) => {
	"user strict";
	if (!req.body.QuestionID)
		return res.status(400)
				.json({ message: "Please provide QuestionID" });
	if (!req.body.Chooices)
		return res.status(400)
				.json({ message: "Please provide Chooices" });
 	if (!req.body.Textbox)
 		return res.status(400)
 				.json({ message: "Please provide Textbox "});
 
	qccService.create(req.body,
		(err, result) => {
			if (err)
				return res.status(result.status)
						.json({ message: result.message });
			else 
				return res.status(result.status)
						.json( result.data );
  	}
  );
});
/**
 * @api {put} /api/questioncheckboxchoices Update Question checkbox choices.
 * @apiVersion 1.0.0
 * @apiName GetQCCupdate
 * @apiGroup Question checkbox choices
 *
 * @apiDescription Updates the question checkbox choices
 *
 * @apiParam {Number}  Id 			The id of choice
 * @apiParam {Number}  QuestionID	The id of question.
 * @apiParam {String}  Chooices		The chooices of question.
 * @apiParam {String}  Textbox		The information about the question.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X put http://localhost:3001/api/questioncheckboxchoices
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 * 		   Id 		  : 1,
 *		   QuestionID : 1,
 * 		   Chooices   : "some strings",
 *		   Textbox    : "some text"
 * 	   }
 *
 */
router.put('/', (req, res) => {
	"user strict";
	if (!req.body.id)
		return res.status(400)
				.json({ message: "Please provide id" });
	if (!req.body.QuestionID)
		return res.status(400)
				.json({ message: "Please provide QuestionID" });
	if (!req.body.Chooices)
		return res.status(400)
				.json({ message: "Please provide Chooices" });
 	if (!req.body.Textbox)
 		return res.status(400)
 				.json({ message: "Please provide Textbox "});
	qccService.update(req.body,
		(err, result) => {
			if (err)
				return res.status(result.status)
						.json({ message: result.message });
			else 
				return res.status(result.status)
						.json( result.data );
  	}
  );
});
/**
 * @api {delete} /api/questioncheckboxchoices/:id Delete Question checkbox choices.
 * @apiVersion 1.0.0
 * @apiName GetQCCdel
 * @apiGroup Question checkbox choices
 *
 * @apiDescription Updates the question checkbox choices
 *
 * @apiParam {Number}  Id 			The id of choice
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X delete http://localhost:3001/api/questioncheckboxchoices/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 *  	 "Deleted question checkbox choice successfully"
 * 	   }
 *
 */
// Deletes the question checkbox choice with the given id
router.delete('/:id', (req, res) => {
	"user strict";
	if (!req.params.id)
		return res.status(400)
				.json({ message: "Please provide parameters id" });
				
	qccService.delete(req.params.id,
		(err, result) => {
			if (err)
				return res.status(result.status)
						.json({ message: result.message });
			else 
				return res.status(result.status)
						.json( result.message );
  	}
  );
});
module.exports = router;