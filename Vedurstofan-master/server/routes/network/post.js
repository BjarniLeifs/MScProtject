var express = require('express');
var router = express.Router();

var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding network to database*/
router.post('/api/addNetwork', function (req, res, next) {
	if (!req.body.name) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	/* Building string and value to update in database */
	var auditid = jwttoken.decodeJWT(req);
	var stringAdd = 'INSERT INTO network (name, id_contact, audit_id) VALUES ($1, $2, $3)';
	var value = [req.body.name, req.body.id_contact, auditid.id];
	/* Passing */
	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to add network.'});
				
			} else {
				return res.status(200).json({message: 'Added network succesfully.'});
			}
		}
	);
});

module.exports = router;