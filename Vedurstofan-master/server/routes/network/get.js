var express = require('express');
var router = express.Router();

var getService = require('../../helpers/get/getAll');

/* Getting all network info */
router.get('/api/getNetwork', function (req, res, next) {
	var table = 'network';

	var string = 'select n.name, c.name as cname from ' + table + ' n left outer join contact c on (n.id_contact = c.id)';

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting all network info */
router.get('/api/getAllNetwork', function (req, res, next) {
	var table = 'network';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting network by id */
router.get('/api/getNetworkById/:id', function (req, res, next) {
	var table = 'network';
	
	var string ='SELECT * FROM '+ table + ' WHERE id = ($1)';
	var value = [req.params.id];

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

/* Getting network by name */
router.get('/api/getNetworkByName/:name', function (req, res, next) {
	//var results = [];
	var name = req.params.name;
	var table = 'network';
	
	var string ='SELECT * FROM '+ table + ' WHERE name = ($1)';
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