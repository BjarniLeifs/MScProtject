var express = require('express');
var router = express.Router();

var getService = require('../../helpers/get/getAll');
var getUserSearchHelper = require('../../helpers/get/getUser');

/* Getting all station landscape info */
router.get('/api/searchInStation/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'station';

	var string = 'SELECT * FROM '+table+' WHERE name LIKE ($1) OR marker LIKE ($1) ';
		string += 'OR comment LIKE ($1) ';


	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInArea/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'station_area';

	var string = 'SELECT * FROM '+table+' WHERE area LIKE ($1) OR description LIKE ($1) ';

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInLandscape/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'station_landscape';

	var string = 'SELECT * FROM '+table+' WHERE landscape LIKE ($1) OR description LIKE ($1) ';

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInSurrounding/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'station_surrounding';

	var string = 'SELECT * FROM '+table+' WHERE surroundings LIKE ($1) ';

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInType/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'station_type';

	var string = 'SELECT * FROM '+table+' WHERE name LIKE ($1) OR type LIKE ($1) ';

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInAntenna/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'antenna_type';

	var string = 'SELECT * FROM '+table+' WHERE name LIKE ($1) OR igs_defined LIKE ($1) OR model LIKE ($1) ';

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInNetwork/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'network';

	var string = 'SELECT * FROM '+table+' WHERE name LIKE ($1) ';

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInZone/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'zone';

	var string = 'SELECT * FROM '+table+' WHERE name LIKE ($1) ';

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInPowerGenType/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'power_generation_type';

	var string = 'SELECT * FROM '+table+' WHERE name LIKE ($1) ';

	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInContact/:text', function (req, res, next) {
	var results = [];
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'contact';

	var string = 'SELECT * FROM '+table+' WHERE name LIKE ($1) ';
	string += ' OR title LIKE ($1) OR company LIKE ($1) OR email LIKE ($1) OR phone LIKE ($1) ';
	string += ' OR gsm LIKE ($1) OR www LIKE ($1) OR comment LIKE ($1) ';
	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {

			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to ' + table});
		}
	});
});

router.get('/api/searchInUsers/:text', function (req, res, next) {
	var search = '%'+req.params.text+'%';
	var value = [search];
	var table = 'users';

	var string = 'SELECT * FROM '+table+' WHERE username LIKE ($1) ';
	string += ' OR name LIKE ($1) OR roles LIKE ($1) OR company LIKE ($1) OR phone LIKE ($1) ';
	string += ' OR email LIKE ($1) OR address LIKE ($1) OR comments LIKE ($1) ';


	helper = getUserSearchHelper.getUserValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

module.exports = router;

