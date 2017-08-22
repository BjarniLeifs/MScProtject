var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');

router.get('/api/getAllStationVisit', function (req, res, next) {
	/* Þarf að birta rétt user og stöff */
	var table = 'station_visit';

	/* pick out what to show */ 
	var string = 'select s.id as sid, s.name as sname ';
	string += 'from station_visit sv left outer join station s on (sv.station_id = s.id) GROUP BY sname, sid';

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});

router.get('/api/getStationVisitById/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out id'});
	}

	var table = 'station_visit';
	
	var string = 'select sv.id, s.id as sid, s.name as sname, sv.date, sv.comments, u.name as uname, sv.work_done, vc.reason_comment, vc.equipment, ';
	string += 'vc.refurbish, vc.scale, vc.bearings, vc.precipitation_gauge, vc.telecommunications_equipment, ';
	string += 'vc.battery, vc.operating_system, vc.desiccant_refurbished, vc.altimeter, vc.photos_taken, vc.other, ';
	string += 'vc.comment as vccomment, sv.station_isokei, vdate.nextvisit ';
	/* Join tables */
	string += 'from station_visit sv left outer join station s on (sv.station_id = s.id) ';
	string += 'left outer join users u on (sv.user_id = u.id) ';
	string += 'left outer join visit_catagory vc on (sv.catagory_id = vc.id) ' ;
	string += 'left outer join visitdate vdate on (sv.next_id = vdate.id)  WHERE sv.id = ($1)';

	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

router.get('/api/getVisitById/:id', function (req, res, next) {

	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out id'});
	}
	
		var string = 'select sv.id, s.id as sid, s.name as sname, sv.date, sv.comments, u.id as uid, u.name as uname, sv.work_done, vc.reason_comment, vc.equipment, ';
		string += 'vc.refurbish, vc.scale, vc.bearings, vc.precipitation_gauge, vc.telecommunications_equipment, ';
		string += 'vc.battery, vc.operating_system, vc.desiccant_refurbished, vc.altimeter, vc.photos_taken, vc.other, ';
		string += 'sv.station_isokei, vdate.nextvisit ';
		/* Join tables */
		string += 'from station_visit sv left outer join station s on (sv.station_id = s.id) ';
		string += 'left outer join users u on (sv.user_id = u.id) ';
		string += 'left outer join visit_catagory vc on (sv.catagory_id = vc.id) ' ;
		string += 'left outer join visitdate vdate on (sv.next_id = vdate.id) WHERE sv.id = ($1)';
		var value = [req.params.id];

		helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

router.get('/api/getStationVisitByStationId/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out id'});
	}

	var string = 'select sv.id, s.id as sid, s.name as sname, sv.date, sv.comments, u.name as uname, sv.work_done, vc.reason_comment, vc.equipment, ';
	string += 'vc.refurbish, vc.scale, vc.bearings, vc.precipitation_gauge, vc.telecommunications_equipment, ';
	string += 'vc.battery, vc.operating_system, vc.desiccant_refurbished, vc.altimeter, vc.photos_taken, vc.other, ';
	string += 'sv.station_isokei, vdate.nextvisit ';
	/* Join tables */
	string += 'from station_visit sv left outer join station s on (sv.station_id = s.id) ';
	string += 'left outer join users u on (sv.user_id = u.id) ';
	string += 'left outer join visit_catagory vc on (sv.catagory_id = vc.id) ' ;
	string += 'left outer join visitdate vdate on (sv.next_id = vdate.id) WHERE s.id = ($1)';
	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

router.get('/api/getAllVisitCatagory', function (req, res, next) {
	
	var table = 'visit_catagory'; 
	var string = 'SELECT * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});
/* Get visit catagory by id */
router.get('/api/getVisitCatagoryById/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out id'});
	}

	var table = 'visit_catagory';
	var string = 'SELECT * FROM ' + table + ' WHERE id = ($1)';
	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

/* Get for next visit */

 /* Get all visit reason comments*/ 
router.get('/api/getAllVisitDate', function (req, res, next) {
	
	var table = 'visitdate';
	var string = 'SELECT * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});

router.get('/api/getVisitDateById/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out id'});
	}

	var table = 'visitdate';
	var string = 'SELECT * FROM ' + table + ' WHERE id = ($1)';
	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

module.exports = router;