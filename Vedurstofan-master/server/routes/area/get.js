var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
/* Definging postgressSQL module */

var stationHelper = require('../../helpers/station');

var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');

/* Getting all station area info */
router.get('/api/getArea', function (req, res, next) {
	
	var table = 'station_area';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});

/* Getting area by id */
router.get('/api/getAreaById/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out id'});
	}

	var table = 'station_area';
	
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

/* Getting area by area */
router.get('/api/getAreaByArea/:area', function (req, res, next) {

	if (!req.params.area) {
		return res.status(400).json({message: 'Please fill out id'});
	}
	var table = 'station_area';
	
	var string ='SELECT * FROM '+ table + ' WHERE area = ($1)';
	var value = [req.params.area];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});


module.exports = router;