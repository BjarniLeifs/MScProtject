var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var putService = require('../../helpers/put/putAll');
var jwttoken = require('../../helpers/users');


router.put('/api/deleteItem', function (req, res, next) {
	if (!req.body.id || !req.body.status) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var string = 'UPDATE item SET id_item_status=($1), audit_id = ($2) WHERE id=($3) returning *';
		var value = [req.body.status, auditid.id, req.body.id];
		addHelper = putService.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add area.'});
				
			} else {
				return res.status(200).json({message: 'Added area succesfully.'});
			}
		}
	);	

});

router.put('/api/updateItem', function (req, res, next) {
	console.log(req.body);
	if (!req.body.id) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var string = 'UPDATE item SET id_item_type = ($1), id_contact_as_producer=($2), id_contact_as_owner=($3), comment=($4), id_item_status=($5), imageurl=($6), audit_id =($7) WHERE id=($8) returning *';
		var value = [req.body.id_item_type, req.body.id_contact_as_producer, req.body.id_contact_as_owner, req.body.comment, req.body.id_item_status, req.body.imageurl, auditid.id, req.body.id];
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

router.put('/api/updateItemStation', function (req, res, next) {
	
	if (!req.body.newstation || !req.body.itemid) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var string = 'UPDATE item SET id_station = ($1), audit_id=($2) WHERE id=($3) returning *';
		var value = [req.body.newstation, auditid.id, req.body.itemid];
		addHelper = putService.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add area.'});
				
			} else {
				return res.status(200).json({message: 'Added area succesfully.'});
			}
		}
	);	
});


module.exports = router;