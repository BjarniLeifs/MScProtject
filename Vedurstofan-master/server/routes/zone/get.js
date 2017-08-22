var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');

var getService = require('../../helpers/get/getAll');



/* Getting all zone info */
router.get('/api/getZone', function (req, res, next) {

	var table = 'zone';
	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting zone by id */
router.get('/api/getZoneById/:id', function (req, res, next) {
	var table = 'zone';
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

/* Getting zone by zone */
router.get('/api/getZoneByName/:name', function (req, res, next) {
	var table = 'zone';
	var string ='SELECT * FROM '+ table + ' WHERE name = ($1)';
	var value = [req.params.name];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

	
});

module.exports = router;