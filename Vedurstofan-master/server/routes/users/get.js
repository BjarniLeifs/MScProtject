var express = require('express');
var router = express.Router();
var getHelper = require('../../helpers/get/getAll');
var getUserHelper = require('../../helpers/get/getUser');


/* Request to get all users from database */
router.get('/api/getAllUsers', function (req, res, next) {
	var table = 'users';
	var string = 'SELECT * FROM ' +table;
	helper = getUserHelper.getUser(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});

/* Get user by id, to get his information  exp: http://localhost:3000/getUserById/5 */
router.get('/api/getUserById/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Needs to have id field'});
	}
	var table = 'users';
	var string = 'SELECT * FROM '+table+' WHERE id = ($1)';
	var value = [req.params.id];

	helper = getUserHelper.getUserValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Get user by username, to get his information */
router.get('/api/getUserByUsername/:username', function (req, res, next) {
	if (!req.params.username) {
		return res.status(400).json({message: 'Needs to have username field'});
	}
	var table = 'users';
	var string = 'SELECT * FROM '+table+' WHERE username = ($1)';
	var value = [req.params.username];

	helper = getUserHelper.getUserValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Get user by name, to get his information */
router.get('/api/getUserByName/:name', function (req, res, next) {
	if (!req.params.name) {
		return res.status(400).json({message: 'Needs to have name field'});
	}
	var table = 'users';
	var string = 'SELECT * FROM '+table+' WHERE name = ($1)';
	var value = [req.params.name];

	helper = getUserHelper.getUserValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Get all user by role, to get his information */
router.get('/api/getUserByRole/:roles', function (req, res, next) {
	if (!req.params.roles) {
		return res.status(400).json({message: 'Needs to have role field'});
	}
	var table = 'users';
	var string = 'SELECT * FROM '+table+' WHERE roles = ($1)';
	var value = [req.params.roles];

	helper = getUserHelper.getUserValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});
/* Get all user by company, to get his information */
router.get('/api/getAllUserOfCompany/:company', function (req, res, next) {
	if (!req.params.company) {
		return res.status(400).json({message: 'Needs to have company field'});
	}
	var table = 'users';
	var string = 'SELECT * FROM '+table+' WHERE company = ($1)';
	var value = [req.params.company];

	helper = getUserHelper.getUserValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});
/* Get user by email, to get his information */
router.get('/api/getUserByEmail/:email', function (req, res, next) {
	if (!req.params.email) {
		return res.status(400).json({message: 'Needs to have email field'});
	}
	var table = 'users';
	var string = 'SELECT * FROM '+table+' WHERE email = ($1)';
	var value = [req.params.email];

	helper = getUserHelper.getUserValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

module.exports = router;
