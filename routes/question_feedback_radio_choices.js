const express = require('express');
const router = express.Router();
const qrcService = require('./../models/question_feedback_radio_choices');

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

router.post('/', (req, res) => {
	"user strict";
	if (!req.body.QuestionID)
		return res.status(400)
				.json({ message: "Please provide QuestionID" });
	if (!req.body.Chooices)
		return res.status(400)
				.json({ message: "Please provide Chooices" });
 
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
