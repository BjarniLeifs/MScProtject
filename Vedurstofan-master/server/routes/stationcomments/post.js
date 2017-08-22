var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding station Comments to database*/
router.post('/api/addStationComments', function (req, res, next) {
	if (!req.body.station_id) {
		return res.status(400).json({message: 'Please fill out all fiels '});
	}
		var date = new Date();
		var auditid = jwttoken.decodeJWT(req);
		var string ='INSERT INTO station_comments (comment, date, station_id, user_id, audit_id) VALUES ($1, $2, $3, $4, $5) returning *';
		var value = [req.body.comment, date, req.body.station_id, req.body.user_id, auditid.id];
		addHelper = postService.postValue(string, value,
			function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add Radome Type.'});
				
			} else {
				return res.status(200).json(results[0]);
			}
		}
	);
});

module.exports = router;
