var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
var stationHelper = require('../../helpers/station');
var getService = require('../../helpers/get/getAll');

/* Getting all station owners info */
router.get('/api/getAllContacts', function (req, res, next) {

	var table = 'contact';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting owner by id */
router.get('/api/getContactById/:id', function (req, res, next) {
	var results = [];
	var table = 'contact';
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

/* Getting owner by owner */
router.get('/api/getContactByName/:name', function (req, res, next) {
	var results = {};

	var table = 'contact';
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
