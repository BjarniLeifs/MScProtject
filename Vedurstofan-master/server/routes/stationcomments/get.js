var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');

/* Getting all station_comment info */
router.get('/api/getAllStationComments', function (req, res, next) {
	var table = 'station_comments';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});


/* Getting station_comments by id */
router.get('/api/getStationCommentById/:id', function (req, res, next) {

	var string ='SELECT * FROM station_comments WHERE id = ($1)';
	 var value = [req.params.id];

		helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getStationCommentByStationId/:id', function (req, res, next) {
	var string = 'select i.id, i.station_id, u.name as user, i.comment as comment, i.date as date ';
		string += 'from station_comments i left outer join users u on(i.user_id = u.id) WHERE station_id = ($1)';
	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
	if (result) {
		return res.status(200).json(result);
	} else {
		return res.status(400).json({message: 'Error running query to '+ table});
	}
	});
});

router.get('/api/getStationCommentByUserId/:id', function (req, res, next) {
	
	var string = 'SELECT * FROM station_comments WHERE user_id = ($1)';
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
