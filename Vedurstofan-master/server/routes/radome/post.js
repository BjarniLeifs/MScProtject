var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding Filter Radome to database*/
router.post('/api/getAllRadomeType/addFilterRadome', function (req, res, next) {
	var results = [];
	if (!req.body.idItem || !req.body.idAttribute || !req.body.idRadomeType) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd ='INSERT INTO filter_radome (id_item, id_attribute, id_radome_type, audit_id) values($1, $2, $3, $4) returning *';
		var value = [req.body.idItem, req.body.idAttribute, req.body.idRadomeType, auditid.id];

		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Filter Radome.'});
				
			} else {
				return res.status(200).json({message: 'Added Radome Filter succesfully.'});
			}
		}
	);
		
});

/* Adding Radome type to database*/
router.post('/api/addRadomeType', function (req, res, next) {
	var results = [];
	
	if (!req.body.name || !req.body.igsDefined) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}	
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd = 'INSERT INTO radome_type (name, igs_defined, description, audit_id) values($1, $2, $3, $4) returning *';
		var value = [req.body.name, req.body.igsDefined, req.body.description, auditid.id];

		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Radome Type.'});
				
			} else {
				return res.status(200).json({message: 'Added Radome Type succesfully.'});
			}
		}
	);
		
});

module.exports = router;