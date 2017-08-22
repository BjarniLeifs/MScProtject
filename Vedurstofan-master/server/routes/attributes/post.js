var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');
/* Adding attributes type to database*/
router.post('/api/addAttribute', function (req, res, next) {
	if (!req.body.name) {
		return res.status(400).json({message: 'Please fill out name'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd ='INSERT INTO attribute (name, audit_id) VALUES($1, $2) returning *';
		var value = [req.body.name, auditid.id];
		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add attribute.'});
				
			} else {
				return res.status(200).json({message: 'Added attribute succesfully.'});
			}
		}
	);
			
});

/* Adding Attribute type to database*/
router.post('/api/addTypeAttribute', function (req, res, next) {
		////console.log("rout all device");
	if (!req.body.idType || !req.body.idAttribute) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd ='INSERT INTO item_type_attribute (id_item_type, id_attribute, audit_id) VALUES($1, $2, $3) returning *';
		var value =[req.body.idType, req.body.idAttribute, auditid.id];
		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add item type attribute.'});
				
			} else {
				return res.status(200).json({message: 'Added item type attribute succesfully.'});
			}
		}
	);
});

module.exports = router;