var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');
/* Adding station Item to database*/
router.post('/api/addStationItem', function (req, res, next) {
	
	if (!req.body.itemid || !req.body.newstation) {
		return res.status(400).json({message: 'Please fill out Station or Item'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var date = new Date();
		var string = 'INSERT INTO station_item (id_station, id_item, date_from, audit_id) VALUES ($1, $2, $3, $4) returning *';
		var value = [req.body.newstation, req.body.itemid, date, auditid.id]; 
		ddHelper = postService.postValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Station Item.'});
				
			} else {
				return res.status(200).json({message: 'Added Station Item succesfully.'});
			}
		}
	);
});

module.exports = router;