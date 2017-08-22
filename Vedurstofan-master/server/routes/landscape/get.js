var express = require('express');
var router = express.Router();

var getService = require('../../helpers/get/getAll');


/* Getting all station landscape info */
router.get('/api/getAllLandscape', function (req, res, next) {
	var results = [];

	var table = 'station_landscape';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting landscape by id */
router.get('/api/getLandscapeById/:id', function (req, res, next) {
	var table = 'station_landscape';
	
	var string ='SELECT * FROM '+ table + ' WHERE id = ($1)';
	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting landscape by landscape */
router.get('/api/getLandscapeByLandscape/:landscape', function (req, res, next) {
	var table = 'station_landscape';
	var string ='SELECT * FROM '+ table + ' WHERE landscape = ($1)';
	var value = [req.params.landscape];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

module.exports = router;
