var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');

router.get('/api/getAllAttributes', function (req, res, next) {
	
	var table = 'attribute';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			//console.log(result);
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

router.get('/api/getAllTypeAttribute', function (req, res, next) {
	var table = 'item_type_attribute';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});



module.exports = router;