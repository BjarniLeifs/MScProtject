var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var stationHelper = require('../../helpers/station');
var postService = require('../../helpers/post/postAll');
var jwttoken = require('../../helpers/users');

/* Adding station owner to database*/
router.post('/api/addContact', function (req, res, next) {
	/* Define what is needed to add Contact minimum. */
	if (!req.body.name || !req.body.company  || !req.body.phone) {
		return res.status(400).json({message: 'Please fill out atleast fields name, company, phone.'});
	}
	/* Building string and value to update in database */
	var auditid = jwttoken.decodeJWT(req);
	var string = 'INSERT INTO contact ';
		string += '(name, title, company, email, phone, gsm, www, comment, imageurl, audit_id) ';
		string += 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';
	var value = [req.body.name, req.body.title, req.body.company, req.body.email, 
		req.body.phone, req.body.gsm, req.body.www, req.body.comment, req.body.imageurl, auditid.id];
	/* Passing */
	addHelper = postService.postValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error accur when trying to update password for user.'});	
			} else {
				return res.status(200).json({message: 'User contact added succesfully.'});
			}
		}
	);
});

module.exports = router;
