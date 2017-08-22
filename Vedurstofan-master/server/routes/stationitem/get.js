var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');

router.get('/api/getStationItemById/:id', function (req, res, next) {
	
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out ID'});
	}
		/* SQL Query, select data */

		var string = 'SELECT * FROM station_item WHERE id_item = ($1) AND date_to IS NULL';
		var value = [req.params.id];
		helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getStationItemHistory/:id', function (req, res, next) {
	
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out ID'});
	}
		/* SQL Query, select data */
		var string = 'select s.name as sname, si.date_from, si.date_to, si.id from station_item si left outer join station s on (si.id_station = s.id) WHERE si.id_item = ($1) ORDER BY si.id DESC';
		//var string = 'SELECT * FROM station_item WHERE id_item = ($1)';
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

