var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding station Visit to database*/
router.post('/api/addStationVisit', function (req, res, next) {
	if (!req.body.user_id || !req.body.station_id || !req.body.catagory_id) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var date = new Date();
		var string = 'INSERT INTO station_visit (station_id, date, comments, user_id, work_done, catagory_id, user2_id, user3_id, station_isokei, next_id, audit_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *';
		var value =[req.body.station_id, date, req.body.comments, req.body.user_id, req.body.work_done, req.body.catagory_id, req.body.user2_id, req.body.user3_id, req.body.station_isokei, req.body.next_id, auditid.id];
	
		Helper = postService.postValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Station Visit.'});
				
			} else {
				return res.status(200).json(results[0]);
			}
		}
	);
});
/* Adding Visit Catagory to database*/
router.post('/api/addVisitCatagory', function (req, res, next) {
		//console.log(req.body);
		var auditid = jwttoken.decodeJWT(req);
		var string = 'INSERT INTO visit_catagory (equipment, refurbish, scale, bearings, precipitation_gauge, telecommunications_equipment, battery, operating_system, desiccant_refurbished, altimeter, photos_taken, other, comment, reason_comment, audit_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *';
		var value = [req.body.equipment, req.body.refurbish, req.body.scale, req.body.bearings, req.body.precipitation_gauge, req.body.telecommunications_equipment, req.body.battery, req.body.operating_system, req.body.desiccant_refurbished, req.body.altimeter, req.body.photos_taken, req.body.other, req.body.comment, req.body.reason_comment, auditid.id];
	
		Helper = postService.postValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Visit Catagory.'});
				
			} else {
				return res.status(200).json(results[0]);
			}
		}
	);
});

/* Adding Visit Date to database*/
router.post('/api/addVisitDate', function (req, res, next) {
		//console.log(req.body);
		if (!req.body.nextvisit) {
		return res.status(400).json({message: 'Please fill out all fields'});
		}
		var auditid = jwttoken.decodeJWT(req);
		var string = 'INSERT INTO visitdate (nextvisit, audit_id) VALUES ($1, $2) returning *';
		var value = [req.body.nextvisit, auditid.id];

		Helper = postService.postValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Visit Date.'});
				
			} else {
				return res.status(200).json(results[0]);
			}
		}
	);	
});

module.exports = router;



