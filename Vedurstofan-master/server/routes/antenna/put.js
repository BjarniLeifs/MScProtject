var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');
var putService = require('../../helpers/put/putAll');


router.put('/api/updateAntennaType', function (req, res, next) {
	
		var string = 'UPDATE antenna_type SET name = ($1), igs_defined = ($2), model = ($3) WHERE id = ($4) returning *';
		var value = [req.body.name, req.body.igs_defined, req.body.model, req.body.id];

		addHelper = putService.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to update Antenna Type.'});
				
			} else {
				return res.status(200).json(results);
			}
		}
	);	
});

router.put('/api/updateFilterAntenna', function (req, res, next) {
	
		var string = 'UPDATE filter_antenna SET id_item = ($1), id_attribute = ($2), id_antenna_type = ($3) WHERE id = ($4) returning *';
		var value = [req.body.id_item, req.body.id_attribute, req.body.id_antenna_type, req.body.id];

		addHelper = putService.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to update Filter Antenna.'});
				
			} else {
				return res.status(200).json(results);
			}
		}
	);	
});

module.exports = router;