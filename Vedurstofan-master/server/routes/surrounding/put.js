var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var putService = require('../../helpers/put/putAll');
var jwttoken = require('../../helpers/users');

router.put('/api/updateSurrounding', function (req, res, next) {
	if (!req.body.id) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var string = 'UPDATE station_surrounding SET surroundings = ($1), audit_id = ($2) WHERE id = ($3) returning *';
		var value = [req.body.surroundings, auditid.id, req.body.id];
		addHelper = putService.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to update surroundings.'});
				
			} else {
				return res.status(200).json({message: 'surroundings update succesfully.'});
			}
		}
	);	
});

module.exports = router;