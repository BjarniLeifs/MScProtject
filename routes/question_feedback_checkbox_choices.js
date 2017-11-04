const express = require('express');
const router = express.Router();
const qccService = require('./../models/question_feedback_checkbox_choices');

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

router.post('/', (req, res) => {
	"user strict";
	if (!req.body.QuestionID)
		return res.status(400)
				.json({ message: "Please provide QuestionID" });
	if (!req.body.Chooices)
		return res.status(400)
				.json({ message: "Please provide Chooices" });

 
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