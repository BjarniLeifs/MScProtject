var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
/* Definging postgressSQL module */

var stationHelper = require('../../helpers/station');

var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');

/* Request to get all stations from database */
router.get('/api/getAllStations', function (req, res, next) {
	
	var table = 'station';
	
	/* select what looking for in the table */
	var string = 'select s.id, s.name, s.marker, s.permanent_marker, s.lat, s.lon, s.altitude, ';
		string += 's.description, s.date_from, s.date_to, s.comment, s.is_active, ';
		string += 'n.name as network_name, c.name as ccontact_name, cd.name as cdata_name, ';
		string += 'z.name as zone_name, st.name as stype_name, st.type, pgt.name as pgt_name, ';
		string += 'sa.area as area_name, ss.surroundings, co.name as cowner_name, ';
		string += 'sl.landscape '; //bæta inn ;

		/* join tables clause */
		string += 'from station s left outer join network n on (s.id_network = n.id) ';
		string += 'left outer join zone z on (s.id_zone = z.id) ';
		string += 'left outer join station_type st on (s.id_station_type = st.id) ';
		string += 'left outer join contact c on (s.id_contact_as_contact = c.id) ';
		string += 'left outer join contact cd on (s.id_contact_as_data_owner = cd.id) ';
		string += 'left outer join power_generation_type pgt on (s.id_power_generation_type = pgt.id) ';
		string += 'left outer join station_area sa on (s.id_area = sa.id) ';
		string += 'left outer join station_surrounding ss on (s.id_surrounding = ss.id) ';
		string += 'left outer join contact co on (s.id_contact_as_owner = co.id) ';
		string += 'left outer join station_landscape sl on (s.id_landscape = sl.id) WHERE s.is_active = TRUE ORDER BY s.name ASC';
	//string += 'left outer join contact cc on (s.id_caretaker = cc.id) '  athuga eftir að græja data í sql fæl!

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});



/* Getting station by ID */
router.get('/api/getStationByID/:id', function (req, res, next) {

	//console.log(req.params);
	//console.log(req.body);
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out id'});
	}

	var table = 'station';

	//var string ='SELECT * FROM station WHERE id = ($1)';
	var string = 'select s.id, s.name, s.marker, s.permanent_marker, s.lat, s.lon, s.altitude, ';
		string += 's.description, s.date_from, s.date_to, s.comment, s.is_active, ';
		string += 'n.name as network_name, c.name as ccontact_name, cd.name as cdata_name, ';
		string += 'z.name as zone_name, st.name as stype_name, st.type, pgt.name as pgt_name, ';
		string += 'sa.area as area_name, ss.surroundings, co.name as cowner_name, ';
		string += 'sl.landscape '; //bæta inn ;

		/* join tables clause */
		string += 'from station s left outer join network n on (s.id_network = n.id) ';
		string += 'left outer join zone z on (s.id_zone = z.id) ';
		string += 'left outer join station_type st on (s.id_station_type = st.id) ';
		string += 'left outer join contact c on (s.id_contact_as_contact = c.id) ';
		string += 'left outer join contact cd on (s.id_contact_as_data_owner = cd.id) ';
		string += 'left outer join power_generation_type pgt on (s.id_power_generation_type = pgt.id) ';
		string += 'left outer join station_area sa on (s.id_area = sa.id) ';
		string += 'left outer join station_surrounding ss on (s.id_surrounding = ss.id) ';
		string += 'left outer join contact co on (s.id_contact_as_owner = co.id) ';
		string += 'left outer join station_landscape sl on (s.id_landscape = sl.id) WHERE s.id = ($1) AND s.is_active = TRUE';

	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});



/* Getting station by name */
router.get('/api/getStationByName/:name', function (req, res, next) {

	//var results = [];
	if (!req.params.name) {
		return res.status(400).json({message: 'Please fill out name'});
	}
		var string = 'select s.id, s.name, s.marker, s.permanent_marker, s.lat, s.lon, s.altitude, ';
		string += 's.description, s.date_from, s.date_to, s.comment, s.is_active, ';
		string += 'n.name as network_name, c.name as ccontact_name, cd.name as cdata_name, ';
		string += 'z.name as zone_name, st.name as stype_name, st.type, pgt.name as pgt_name, ';
		string += 'sa.area as area_name, ss.surroundings, co.name as cowner_name, ct.name as caretaker, ';
		string += 'sl.landscape '; //bæta inn ;

		/* join tables clause */
		string += 'from station s left outer join network n on (s.id_network = n.id) ';
		string += 'left outer join zone z on (s.id_zone = z.id) ';
		string += 'left outer join station_type st on (s.id_station_type = st.id) ';
		string += 'left outer join contact c on (s.id_contact_as_contact = c.id) ';
		string += 'left outer join contact cd on (s.id_contact_as_data_owner = cd.id) ';
		string += 'left outer join power_generation_type pgt on (s.id_power_generation_type = pgt.id) ';
		string += 'left outer join station_area sa on (s.id_area = sa.id) ';
		string += 'left outer join station_surrounding ss on (s.id_surrounding = ss.id) ';
		string += 'left outer join contact co on (s.id_contact_as_owner = co.id) ';
		string += 'left outer join contact ct on (s.id_caretaker = ct.id) ';
		string += 'left outer join station_landscape sl on (s.id_landscape = sl.id) WHERE s.name = ($1)';
	
		/* SQL Query, select data */
		//var string ='SELECT * FROM station WHERE name = ($1)';
		var value = [req.params.name];
		helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});

/* Getting station by name */
router.get('/api/getStationByNameForUpdate/:name', function (req, res, next) {

	if (!req.params.name) {
		return res.status(400).json({message: 'Please fill out name'});
	}
		var string = 'select s.id, s.name, s.marker, s.permanent_marker, s.lat, s.lon, s.altitude, ';
		string += 's.description, s.date_from, s.date_to, s.comment, s.is_active, ';
		string += 'n.name as network_name, c.name as ccontact_name, cd.name as cdata_name, ';
		string += 'z.name as zone_name, st.name as stype_name, st.type, pgt.name as pgt_name, ';
		string += 'sa.area as area_name, ss.surroundings as surround, co.name as cowner_name, ct.name as caretaker, ';
		string += 'sl.landscape '; //bæta inn ;

		/* join tables clause */
		string += 'from station s left outer join network n on (s.id_network = n.id) ';
		string += 'left outer join zone z on (s.id_zone = z.id) ';
		string += 'left outer join station_type st on (s.id_station_type = st.id) ';
		string += 'left outer join contact c on (s.id_contact_as_contact = c.id) ';
		string += 'left outer join contact cd on (s.id_contact_as_data_owner = cd.id) ';
		string += 'left outer join power_generation_type pgt on (s.id_power_generation_type = pgt.id) ';
		string += 'left outer join station_area sa on (s.id_area = sa.id) ';
		string += 'left outer join station_surrounding ss on (s.id_surrounding = ss.id) ';
		string += 'left outer join contact co on (s.id_contact_as_owner = co.id) ';
		string += 'left outer join contact ct on (s.id_caretaker = ct.id) ';
		string += 'left outer join station_landscape sl on (s.id_landscape = sl.id) WHERE s.name = ($1)';

		/* SQL Query, select data */
		//var string = 'SELECT * FROM station WHERE name = ($1)';
		var value = [req.params.name]; 
		helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});



module.exports = router;