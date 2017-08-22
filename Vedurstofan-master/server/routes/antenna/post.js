var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding antenna to database*/
router.post('/api/addAntenna', function (req, res, next) {
	console.log(req.body);
	if (!req.body.name || !req.body.igs_defined) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
	/* Building string and value for query database */
	var auditid = jwttoken.decodeJWT(req);
	var stringAdd = 'INSERT INTO antenna_type (name, igs_defined, model, audit_id) VALUES ($1, $2, $3, $4)';
	var value = [req.body.name, req.body.igs_defined, req.body.model, auditid.id];
	/* Pusing to database the query */
	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying add Antenna.'});
			
			} else {
				console.log(results);
				return res.status(200).json({message: 'Antenna added succesfully.'});
			}
		}
	);
});

router.post('/api/addFilterAntenna', function (req, res, next) {
	var results = [];
	//console.log(req.body);
	if (!req.body.idItem || !req.body.idAttribute || !req.body.idAntennaType) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd ='INSERT INTO filter_antenna (id_item, id_attribute, id_antenna_type, audit_id) values($1, $2, $3, $4)';
		var value = [req.body.idItem, req.body.idAttribute, req.body.idAntennaType, auditid.id];
		
		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to add Filter Antenna.'});
				
			} else {
				return res.status(200).json({message: 'Added Filter Antenna succesfully.'});
			}
		}
	);
		
});

module.exports = router;