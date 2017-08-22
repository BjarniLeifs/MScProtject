var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');

/* Getting all  antenna info */
router.get('/api/getAllAntenna', function (req, res, next) {
	/* Building string for query */
	var table = 'antenna_type';
	var string = 'select * from ' + table;
	/* Pushing to database the query */
	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});
router.get('/api/getAntennaByName/:name', function (req, res, next) {
	var table = 'antenna_type';
	var name = req.params.name;

	var string = 'select * from ' + table + ' WHERE name = ($1)';
	var value = [req.params.name];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getAllFilterAntenna', function (req, res, next) {
	var table = 'filter_antenna';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});


module.exports = router;