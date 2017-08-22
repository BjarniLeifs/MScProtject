var express = require('express');
var router = express.Router();

var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding new surrounding to database */
router.post('/api/addSurrounding', function (req, res, next) {
	if (!req.body.surrounding) {
		return res.status(400).json({message: 'Please fill out fields surrounding'});
	}
	var auditid = jwttoken.decodeJWT(req);
	/* Building string and value to update in database */
	var stringAdd = 'INSERT INTO station_surrounding (surroundings, audit_id) VALUES ($1, $2)';
	var value = [req.body.surrounding, auditid.id];
	/* Passing */
	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to add Surrounding.'});
				
			} else {
				return res.status(200).json({message: 'Surrounding added succesfully.'});
			}
		}
	);
});

module.exports = router;