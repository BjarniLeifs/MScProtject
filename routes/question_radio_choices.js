const express = require('express');
const router = express.Router();
const qrcService = require('./../models/question_radio_choices');
/**
 * @api {get} /api/questionradioboxchoices Get Question radio choices.
 * @apiVersion 1.0.0
 * @apiName GetQrC
 * @apiGroup Question radio choices
 *
 * @apiDescription Returns a list of all question radio choices.
 *
 * @apiParam {None}  - 			No parameters required.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/questionradioboxchoices
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
router.get('/', (req, res) => {
	"user strict";
	qrcService.get(
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
 * @api {get} /api/questionradioboxchoices/:id Get Question radio choices by id.
 * @apiVersion 1.0.0
 * @apiName GetQrCid
 * @apiGroup Question radio choices
 *
 * @apiDescription Returns the info of a question radio choices with the given id.
 *
 * @apiParam {Number}  id		The id of question radio choices.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/questionradioboxchoices/1
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

	qrcService.getRadioChoiceByID(req.params.id,
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

	qrcService.getRadioChoiceByQuestionID(req.params.id,
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
 * @api {post} /api/questionradioboxchoices Adds Question radio choices.
 * @apiVersion 1.0.0
 * @apiName GetQrCadd
 * @apiGroup Question radio choices
 *
 * @apiDescription Adds a new question radio choices to the database
 *
 * @apiParam {Number}  QuestionID	The id of question.
 * @apiParam {String}  Chooices		The chooices of question.
 * @apiParam {String}  Textbox		The information about the question.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X post http://localhost:3001/api/questionradioboxchoices
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
 
	qrcService.create(req.body,
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
 * @api {put} /api/questionradioboxchoices Update Question radio choices.
 * @apiVersion 1.0.0
 * @apiName GetQrCupdate
 * @apiGroup Question radio choices
 *
 * @apiDescription Updates the question radio choices
 *
 * @apiParam {Number}  Id 			The id of choice
 * @apiParam {Number}  QuestionID	The id of question.
 * @apiParam {String}  Chooices		The chooices of question.
 * @apiParam {String}  Textbox		The information about the question.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X put http://localhost:3001/api/questionradioboxchoices
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

 	qrcService.update(req.body,
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
 * @api {delete} /api/questionradioboxchoices/:id Delete Question radio choices.
 * @apiVersion 1.0.0
 * @apiName GetQrCdel
 * @apiGroup Question radio choices
 *
 * @apiDescription Updates the question radio choices
 *
 * @apiParam {Number}  Id 			The id of choice
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X delete http://localhost:3001/api/questionradioboxchoices/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   { 
 *  	 "Deleted question radio choice successfully"
 * 	   }
 *
 */
router.delete('/:id', (req, res) => {
	"user strict";
	if (!req.params.id)
		return res.status(400)
				.json({ message: "Please provide parameters id" });
		
	qrcService.delete(req.params.id,
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
