var express = require('express');
var router = express.Router();
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding station type to database*/
router.post('/api/addType', function (req, res, next) {
	if (!req.body.name || !req.body.type) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	var auditid = jwttoken.decodeJWT(req);
	/* Building string and value to update in database */
	var stringAdd = 'INSERT INTO station_type (name, type, audit_id) VALUES ($1, $2, $3)';
	var value = [req.body.name, req.body.type, auditid.id];
	/* Passing */
	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to add type.'});
				
			} else {
				return res.status(200).json({message: 'Type added succesfully.'});
			}
		}
	);

});

module.exports = router;