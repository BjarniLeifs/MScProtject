var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');


/* Definging postgressSQL module */
var pg = require('pg');
/* Definging configuration of database config */
var db = require('../../config/database');
/* Defining connectionstring for the database */
var connectionString = process.env.DATABASE_URL || db.url;

/* Adding Item type to database*/
router.post('/api/addItemType', function (req, res, next) {
		////console.log("rout all device");
	if (!req.body.name) {
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	var auditid = jwttoken.decodeJWT(req);
	var stringAdd = 'INSERT INTO item_type (name, audit_id) VALUES($1,$2) returning *';
	var value = [req.body.name, auditid.id];

	addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add item type.'});
				
			} else {
				return res.status(200).json({message: 'Added item type succesfully.'});
			}
		}
	);	
});

/* Adding Item Status to database*/
router.post('/api/addItemStatus', function (req, res, next) {
	if (!req.body.name) {
		return res.status(400).json({message: 'Please fill out name field.'});
	}
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd ='INSERT INTO item_status (name, audit_id) values($1, $2) returning *';
		var value = [req.body.name, auditid.id];

		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Item Status.'});
				
			} else {
				return res.status(200).json({message: 'Added Item Status succesfully.'});
			}
		}
	);	
});

/* Adding Item Maintaince to database*/
router.post('/api/addItemMaintainace', function (req, res, next) {
	if (!req.body.idItem || !req.body.idUser || !req.body.description) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var date = new Date();
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd = 'INSERT INTO item_maintainance (item_id, user_id, date, description, audit_id) values($1, $2, $3, $4, $5) returning *';
		var value = [req.body.idItem, req.body.idUser, date, req.body.description, auditid.id];

		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Item Maintaince.'});
				
			} else {
				return res.status(200).json({message: 'Added Item Maintaince succesfully.'});
			}
		}
	);	
});

/* Adding Item Comments to database*/
router.post('/api/addItemComments', function (req, res, next) {
	console.log(req.body);
	if (!req.body.idItem || !req.body.idUser || !req.body.comment) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var date = new Date();
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd = 'INSERT INTO item_comments (item_id, comment, user_id, date, audit_id) values($1, $2, $3, $4, $5) returning *';
		var value = [req.body.idItem, req.body.comment, req.body.idUser, date, auditid.id];

		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Item Comments.'});
				
			} else {
				return res.status(200).json({message: 'Added Item Comments succesfully.'});
			}
		}
	);	
});

/* Adding Item Attribute to database*/
router.post('/api/addItemAttribute', function (req, res, next) {
	if (!req.body[0].itemID || !req.body[0].attid) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}

	var results = [];
	var query;
	
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			done();
			return res.status(400).json({message: 'Error fetching client from pool'});
		}
	for(i = 0; i < req.body.length; i++){
		var date = new Date();
		var auditid = jwttoken.decodeJWT(req);
		var string = 'INSERT INTO item_attribute (id_item, id_attribute, date_from, date_to, value_varchar, value_date, value_numeric, audit_id) values($1, $2, $3, $4, $5, $6, $7, $8) returning *';
		var values = [req.body[i].itemID, req.body[i].attid, date, req.body.dateTo, req.body[i].value, req.body[i].valuedate, req.body[i].valueNumeric, auditid.id];

		query = client.query(string, values);
	}

		query.on('end' , function () {
			if (err) {
				done();
				return res.status(400).json({message: 'Error running query to add item status'});
			} else {
				done();
				return res.status(200).json({message: 'Item status was added!'});
			}

		});
	});
});

/* Adding Item to database*/
router.post('/api/addItem', function (req, res, next) {
	if (!req.body.idItemType) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
		var date = new Date();
		var auditid = jwttoken.decodeJWT(req);
		var stringAdd ='INSERT INTO item (id_item_type, id_contact_as_producer, id_contact_as_owner, comment, id_item_status, imageurl, audit_id) values($1, $2, $3, $4, $5, $6, $7) returning *';
		var value =[req.body.idItemType, req.body.idProducer, req.body.idOwner, req.body.comment, req.body.idItemStatus, req.body.imageUrl, auditid.id];
		addHelper = postService.postValue(stringAdd, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Item.'});
				
			} else {
				return res.status(200).json(results);
			}
		}
	);	
});

module.exports = router;