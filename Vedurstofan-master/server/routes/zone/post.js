var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding zone to database*/
router.post('/api/addZone', function (req, res, next) {
	if (!req.body.name) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	var auditid = jwttoken.decodeJWT(req);
	/* Building string and value to update in database */
	var stringAdd = 'INSERT INTO zone (name, audit_id) VALUES ($1, $2)';
	var value = [req.body.name, auditid.id];
	/* Passing */
	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to add zone.'});
				
			} else {
				return res.status(200).json({message: 'Zone added succesfully.'});
			}
		}
	);
});

module.exports = router;