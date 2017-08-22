var express = require('express');
var router = express.Router();
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding station landscape to database*/
router.post('/api/addLandscape', function (req, res, next) {
	if (!req.body.landscape || !req.body.description) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	/* Building string and value to update in database */
	var auditid = jwttoken.decodeJWT(req);
	var stringAdd = 'INSERT INTO station_landscape (landscape, description, audit_id) VALUES ($1, $2, $3)';
	var value = [req.body.landscape, req.body.description, auditid.id];
	/* Passing */
	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to add landscape.'});
				
			} else {
				return res.status(200).json({message: 'Added landscape succesfully.'});
			}
		}
	);
});

module.exports = router;
