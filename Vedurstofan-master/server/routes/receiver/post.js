var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding Filter Receiver to database*/
router.post('/api/addFilterReceiver', function (req, res, next) {
	var results = [];
	
	if (!req.body.idItem || !req.body.idAttribute || !req.body.idReceiverType) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd ='INSERT INTO filter_receiver (id_item, id_attribute, id_receiver_type, auditid) values($1, $2, $3, $4) returning *';
		var value = [req.body.idItem, req.body.idAttribute, req.body.idReceiverType, auditid.id];

		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Filter Receiver.'});
				
			} else {
				return res.status(200).json({message: 'Added Filter Receiver succesfully.'});
			}
		}
	);
});

/* Adding Receiver type to database*/
router.post('/api/addReceiverType', function (req, res, next) {
	var results = [];
	
	if (!req.body.name|| !req.body.igsDefined) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd = 'INSERT INTO receiver_type (name, igs_defined, model, audit_id) values($1, $2, $3, $4) returning *';
		var value = [req.body.name, req.body.igsDefined, req.body.model, auditid.id];

		qaddHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Receiver type.'});
				
			} else {
				return res.status(200).json({message: 'Added Receiver type succesfully.'});
			}
		}
	);
});

module.exports = router;