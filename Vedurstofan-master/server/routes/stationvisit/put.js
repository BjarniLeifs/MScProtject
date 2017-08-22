var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var putService = require('../../helpers/put/putAll');
var jwttoken = require('../../helpers/users');

router.put('/api/updateStationVisit', function (req, res, next) {
		
		var auditid = jwttoken.decodeJWT(req);
		var string = 'Update station_visit SET ';
		string += 'station_id = ($1), date = ($2), comments = ($3), user_id = ($4), ';
		string += 'work_done = ($5), catagory_id = ($6), user2_id = ($7), user3_id = ($8), station_isokei = ($9), ';
		string += 'next_id = ($10), audit_id = ($11) where id = ($12) returning *';
		
		var value = [req.body.station_id, req.body.date, req.body.comments, req.body.user_id, req.body.work_done,
		req.body.catagory_id, req.body.user2_id, req.body.user3_id, req.body.station_isokei, req.body.next_id, auditid.id, req.body.id]; 
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

router.put('/api/updateVisitCatagory', function (req, res, next) {
		var auditid = jwttoken.decodeJWT(req);

		var string = 'Update visit_catagory SET ';
		string += 'equipment = ($1), refurbish = ($2), scale = ($3), bearings = ($4), precipitation_gauge = ($5), ';
		string += 'telecommunications_equipment = ($6), battery = ($7), operating_system = ($8), desiccant_refurbished = ($9), altimeter = ($10), ';
		string += 'photos_taken = ($11), other = ($12), comment = ($13), reason_comment = ($14), audit_id = ($15) where id = ($16) returning *';
		
		var value = [req.body.equipment, req.body.refurbish, req.body.scale, req.body.bearings, req.body.precipitation_gauge, req.body.telecommunications_equipment,
		req.body.battery, req.body.operating_system, req.body.desiccant_refurbished, req.body.altimeter, req.body.photos_taken, req.body.other, req.body.comment, req.body.reason_comment, auditid.id ,req.body.id]; 

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

router.put('/api/updateVisitDate', function (req, res, next) {
		
		var auditid = jwttoken.decodeJWT(req);
		var string = 'Update visitdate SET ';
		string += 'nextvisit = ($1), audit_id = ($2) where id = ($3) returning *';
		
		var value = [req.body.nextvisit, auditid.id ,req.body.id]; 
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


