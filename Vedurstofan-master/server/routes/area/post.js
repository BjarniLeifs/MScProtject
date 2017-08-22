var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
var stationHelper = require('../../helpers/station');
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');


/* Adding station area to database*/
router.post('/api/addArea', function (req, res, next) {
	if (!req.body.area || !req.body.description) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
	/* Building string and value to update in database */
	var auditid = jwttoken.decodeJWT(req);
	var stringAdd = 'INSERT INTO station_area (area, description, audit_id) VALUES ($1, $2, $3)';
	var value = [req.body.area, req.body.description, auditid.id];
	/* Passing */
	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to add area.'});
				
			} else {
				return res.status(200).json({message: 'Added area succesfully.'});
			}
		}
	);
});

module.exports = router;