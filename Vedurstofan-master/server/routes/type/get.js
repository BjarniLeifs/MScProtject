var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
/* Definging postgressSQL module */
var pg = require('pg');
/* Definging configuration of database config */
var db = require('../../config/database');

var stationHelper = require('../../helpers/station');
/* Defining connectionstring for the database */
var connectionString = process.env.DATABASE_URL || db.url;


var getService = require('../../helpers/get/getAll');


/* Getting all station type info */
router.get('/api/getAllType', function (req, res, next) {
	var table = 'station_type';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting type by id */
router.get('/api/getTypeById/:id', function (req, res, next) {
	var table = 'station_type';
	
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


module.exports = router;