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


/*******************************************/
/*******************************************/
/****************** GET ********************/
/*******************************************/
/*******************************************/

/* Getting all station area info */
router.get('/api/allhistory', function (req, res, next) {
	
	var table = 'audit.history';

	var string = "select * from " + table + " WHERE tablename != 'users'";

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			//console.log(result);
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});

/* Getting area by id */
router.get('/api/getHistorybyUserID/:id', function (req, res, next) {
	console.log(req.params);
	var results = [];
	var id = req.params.id;

	var table = 'audit.history';

	var string = "SELECT * FROM "+ table +" WHERE tablename != 'users' AND new_val->>'audit_id' = '"+id+"' OR old_val->>'audit_id' = '"+id+"'"; 

	helper = getService.getAll(string, function (err, result) {
		if (err) {
			return res.status(400).json({message: 'Error running query to '+ table});
		} else {
			return res.status(200).json(result);
		}
	});
});


module.exports = router;