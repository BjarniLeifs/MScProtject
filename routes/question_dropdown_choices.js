const express = require('express');
const router = express.Router();
const qdcService = require('./../models/question_dropdown_choices');
/**
 * @api {get} /api/questiondropdownchoices Get Question dropdown choices.
 * @apiVersion 1.0.0
 * @apiName GetQdC
 * @apiGroup Question dropdown choices
 *
 * @apiDescription Returns a list of all question dropdown choices.
 *
 * @apiParam {None}  - 			No parameters required.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/questiondropdownchoices
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 *      {
 * 		   Id 		  : 1,
 *		   QuestionID : 1,
 * 		   Chooices   : "some string",
 *		   Cond       : "some string",
 *		   Textbox    : "some text"
 *      },
 *		 ....
 * 	   }
 *
 */
router.get('/', (req, res) => {
	"user strict";
	qdcService.get(
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
 * @api {get} /api/questiondropdownchoices/:id Get Question dropdown choices by id.
 * @apiVersion 1.0.0
 * @apiName GetQdCid
 * @apiGroup Question dropdown choices
 *
 * @apiDescription Returns the info of a question dropdown choices with the given id.
 *
 * @apiParam {Number}  id		The id of question dropdown choices.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/questiondropdownchoices/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 * 		   Id 		  : 1,
 *		   QuestionID : 1,
 * 		   Chooices   : "some strings",
 *		   Cond       : "some string",
 *		   Textbox    : "some text"
 * 	   }
 *
 */
router.get('/:id', (req, res) => {
	"user strict";
	if (!req.params.id)
		return res.status(400)
				.json({ message: "Please provide id." });

	qdcService.getDropdownChoiceByID(req.params.id,
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

	qdcService.getDropdownChoiceByQuestionID(req.params.id,
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
 * @api {post} /api/questiondropdownchoices Adds Question dropdown choices.
 * @apiVersion 1.0.0
 * @apiName GetQdCadd
 * @apiGroup Question dropdown choices
 *
 * @apiDescription Adds a new question dropdown choices to the database
 *
 * @apiParam {Number}  QuestionID	The id of question.
 * @apiParam {String}  Chooices		The chooices of question.
 * @apiParam {String}  Cond  		The Cond of question.
 * @apiParam {String}  Textbox		The information about the question.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X post http://localhost:3001/api/questiondropdownchoices
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 * 		   Id 		  : 1,
 *		   QuestionID : 1,
 * 		   Chooices   : "some strings",
 *		   Cond       : "some string",
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
	if (!req.body.Cond)
		return res.status(400)
				.json({ message: "Please provide Cond" });
				
	qdcService.create(req.body, 
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
 * @api {put} /api/questiondropdownchoices Update Question dropdown choices.
 * @apiVersion 1.0.0
 * @apiName GetQdCupdate
 * @apiGroup Question dropdown choices
 *
 * @apiDescription Updates the question dropdown choices
 *
 * @apiParam {Number}  Id 			The id of choice
 * @apiParam {Number}  QuestionID	The id of question.
 * @apiParam {String}  Chooices		The chooices of question.
 * @apiParam {String}  Cond  		The Cond of question.
 * @apiParam {String}  Textbox		The information about the question.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X put http://localhost:3001/api/questiondropdownchoices
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 * 		   Id 		  : 1,
 *		   QuestionID : 1,
 * 		   Chooices   : "some strings",
 *		   Cond       : "some string",
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
	if (!req.body.Cond)
		return res.status(400)
				.json({ message: "Please provide Cond" });
	qdcService.update(req.body,
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
 * @api {delete} /api/questiondropdownchoices/:id Delete Question dropdown choices.
 * @apiVersion 1.0.0
 * @apiName GetQdCdel
 * @apiGroup Question dropdown choices
 *
 * @apiDescription Updates the question dropdown choices
 *
 * @apiParam {Number}  Id 			The id of choice
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X delete http://localhost:3001/api/questiondropdownchoices/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 *  	 "Deleted question dropdown choice successfully"
 * 	   }
 *
 */
router.delete('/:id', (req, res) => {
	"user strict";
	if (!req.body.id)
		return res.status(400)
				.json({ message: "Please provide id" });

	
	qdcService.delete(req.params.id,
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
module.exports = router;