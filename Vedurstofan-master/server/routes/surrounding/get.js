var express = require('express');
var router = express.Router();

var getService = require('../../helpers/get/getAll');


/* Getting all surroundings info */
router.get('/api/getSurroundings', function (req, res, next) {
	var table = 'station_surrounding';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting surrounding by id */
router.get('/api/getSurroundingById/:id', function (req, res, next) {
	var table = 'station_surrounding';
	var string ='SELECT * FROM '+ table + ' WHERE id = ($1)';
	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting surrounding by surrounding */
router.get('/api/getSurroundingBySurroundings/:surroundings', function (req, res, next) {
	var table = 'station_surrounding';
	var string ='SELECT * FROM '+ table + ' WHERE surroundings = ($1)';
	var value = [req.params.surroundings];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});


module.exports = router;