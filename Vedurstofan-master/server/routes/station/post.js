var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
/* Definging postgressSQL module */

var stationHelper = require('../../helpers/station');

var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding new station to database */
router.post('/api/addStation', function (req, res, next) {

	if (!req.body.name || !req.body.marker) {
		return res.status(400).json({message: 'Please fill out field name and marker'});
	}
		var date = new Date();
		var auditid = jwttoken.decodeJWT(req);
		/* Building a string to insert to database */
		var string = 'INSERT INTO station ';
		string += '(name, marker, permanent_marker, lat, lon, altitude, description, date_from, date_to, ';
		string += ' id_network, id_zone, id_station_type, id_contact_as_contact, id_contact_as_data_owner, id_power_generation_type, ';
		string += 'comment, id_area, id_surrounding, id_contact_as_owner, id_landscape, is_active, id_caretaker, imageurl, audit_id) ';
		string += 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) ';
		string += 'returning *';
		var value = [req.body.name, req.body.marker, req.body.permanent_marker, req.body.lat, req.body.lon, req.body.altitude,
		 req.body.description, date, req.body.date_to, req.body.id_network, req.body.id_zone,
		 req.body.id_station_type, req.body.id_contact_as_contact, req.body.id_contact_as_data_owner,
		 req.body.id_power_generation_type, req.body.comment, req.body.id_area, req.body.id_surrounding,
		 req.body.id_contact_as_owner, req.body.id_landscape, req.body.is_active, req.body.id_caretaker, req.body.imageurl, auditid.id]; 
			 
		addHelper = postService.postValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Station.'});
				
			} else {
				console.log(results);
				return res.status(200).json(results[0]);
			}
		}
	);
});

module.exports = router;