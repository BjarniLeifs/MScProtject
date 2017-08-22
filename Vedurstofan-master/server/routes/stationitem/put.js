var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var putService = require('../../helpers/put/putAll');
var jwttoken = require('../../helpers/users');


router.put('/api/updateStationItem', function (req, res, next) {
	console.log(req.body);
	if (!req.body.itemid || !req.body.oldstation) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var date = new Date();
		var string = 'UPDATE station_item SET date_to = ($1), audit_id = ($2) WHERE id_station = ($3) AND id_item = ($4) AND date_to IS NULL returning *';
		var value = [date, auditid.id, req.body.oldstation, req.body.itemid];

		addHelper = putService.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add area.'});
				
			} else {
				return res.status(200).json(results);
			}
		}
	);	
});

module.exports = router;