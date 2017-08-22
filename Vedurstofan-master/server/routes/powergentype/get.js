var express = require('express');
var router = express.Router();

var getService = require('../../helpers/get/getAll');


/* Getting all Power Generation Types info */
router.get('/api/getPowerGenType', function (req, res, next) {
	var table = 'power_generation_type';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting Power GenerationType by id */
router.get('/api/getPowerGenTypeById/:id', function (req, res, next) {
	var table = 'power_generation_type';
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

/* Getting Power Generation Type by name */
router.get('/api/getPowerGenTypeByName/:name', function (req, res, next) {
	var table = 'power_generation_type';
	var string ='SELECT * FROM '+ table + ' WHERE name = ($1)';
	var value = [req.params.name];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	var results = [];
	var name = req.params.name;
});



module.exports = router;