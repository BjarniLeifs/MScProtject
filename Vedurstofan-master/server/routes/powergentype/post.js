var express = require('express');
var router = express.Router();
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding generation type to database*/
router.post('/api/addPowerGenType', function (req, res, next) {
	if (!req.body.name) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	/* Building string and value to update in database */
	var auditid = jwttoken.decodeJWT(req);
	var stringAdd = 'INSERT INTO  power_generation_type (name, audit_id) VALUES ($1, $2)';
	var value = [req.body.name, auditid.id];
	/* Passing */
	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to add power_generation_type.'});
				
			} else {
				return res.status(200).json({message: 'Added power_generation_type succesfully.'});
			}
		}
	);

});


module.exports = router;