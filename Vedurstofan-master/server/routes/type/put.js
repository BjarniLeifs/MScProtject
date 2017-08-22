var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var putService = require('../../helpers/put/putAll');
var jwttoken = require('../../helpers/users');

router.put('/api/updateType', function (req, res, next) {
	if (!req.body.id) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}

		var auditid = jwttoken.decodeJWT(req);
		var string = 'UPDATE station_type SET name = ($1), type =($2), audit_id = ($3) WHERE id = ($4) returning *';
		var value = [req.body.name, req.body.type, auditid.id, req.body.id];
		addHelper = putService.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to update type.'});
				
			} else {
				return res.status(200).json({message: 'Type update succesfully.'});
			}
		}
	);	
});

module.exports = router;