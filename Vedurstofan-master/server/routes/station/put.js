var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
/* Definging postgressSQL module */

var stationHelper = require('../../helpers/station');

var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var putService = require('../../helpers/put/putAll');
var jwttoken = require('../../helpers/users');

/* Update station */
router.put('/api/updateStation', function (req, res, next) {
		var auditid = jwttoken.decodeJWT(req);
		var string = 'Update station SET ';
		string += 'name = ($1), marker = ($2), permanent_marker = ($3), lat = ($4), lon = ($5), ';
		string += 'altitude = ($6), description = ($7), date_to = ($8), id_network = ($9), id_zone = ($10), ';
		string += 'id_station_type = ($11), id_contact_as_contact = ($12), id_contact_as_data_owner = ($13), ';
		string += 'id_power_generation_type = ($14), comment = ($15), id_area = ($16), id_surrounding = ($17), ';
		string += 'id_contact_as_owner = ($18), id_landscape = ($19), is_active = ($20), id_caretaker = ($21), imageurl = ($22), ';
		string += 'audit_id = ($23) where id = ($24) returning *';
		
		var value = [req.body.name, req.body.marker, req.body.permanent_marker, req.body.lat, req.body.lon, req.body.altitude,
		req.body.description, req.body.date_to, req.body.id_network, req.body.id_zone,
		req.body.id_station_type, req.body.id_contact_as_contact, req.body.id_contact_as_data_owner,
		req.body.id_power_generation_type, req.body.comment, req.body.id_area, req.body.id_surrounding,
		req.body.id_contact_as_owner, req.body.id_landscape, req.body.is_active, req.body.id_caretaker, req.body.imageurl, auditid.id, req.body.id]; 

		addHelper = putService.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to update station.'});
				
			} else {
				console.log('else i put station');
				console.log(results);
				return res.status(200).json(results[0]);
			}
		}
	);	
});

/* Update the station active state */
router.put('/api/updateIsActive', function (req, res, next) {
	
		var auditid = jwttoken.decodeJWT(req);
		var string = 'UPDATE station SET is_active = ($1), audit_id =($2) WHERE id = ($3) returning *';
		var value = [req.body.active, auditid.id, req.body.id];

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