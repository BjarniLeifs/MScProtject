var express = require('express');
var router = express.Router();
/* Helpers to handle database query */
var getService = require('../../helpers/get/getAll');
var postService = require('../../helpers/post/postAll');

router.get('/api/getAllStationItems', function (req, res, next) {
	var table = 'station_item';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getAllItems', function (req, res, next) {

	var table = 'item';
	
	var string = 'select it.name, i.id as iid, c.name as cname, cd.name as cdname, i.comment, s.name as sname, i.imageurl ';
			string += 'from item i left outer join item_type it on(i.id_item_type = it.id) ';
			string += 'left outer join item_status s on(i.id_item_status = s.id) ';
			string += 'left outer join contact c on (i.id_contact_as_producer = c.id) ';
			string += 'left outer join contact cd on (i.id_contact_as_owner = cd.id) ';
	
	helper = getService.getAll(string ,function (err, result) {
		////console.log("get " + result);
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});

});

router.get('/api/getAllItemAttribute/:id', function (req, res, next) {
	
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out ID'});
	}

		/* SQL Query, select data 'SELECT * FROM item_attribute WHERE id_item = ($1)'*/
		var string = 'select a.name as aname, i.date_from, i.date_to, i.value_varchar, i.value_date, i.value_numeric ';
			string += 'from item_attribute i left outer join attribute a on(i.id_attribute = a.id) ';
			string +=	'WHERE i.id_item = ($1)';
		var value = [req.params.id];

		helper = getService.getByValue(string, value ,function (err, result) {
		////console.log("get " + result);
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getAllItemCommentsByID/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out ID'});
	}
		var string = 'select u.name as user, i.comment as comment, i.date as date ';
			string += 'from item_comments i left outer join users u on(i.user_id = u.id) WHERE i.item_id = ($1)';
		var value = [req.params.id];
		
	helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getAllItemType', function (req, res, next) {
	var table = 'item_type';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getAllItemStatus', function (req, res, next) {
	
	var table = 'item_status';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getAllItemMaintainance', function (req, res, next) {
	var table = 'item_maintainance';

	var string = 'select * from ' + table;

	helper = getService.getAll(string, function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});

router.get('/api/getAllActiveItems', function (req, res, next) {
	
	var string = 'select it.name, i.id as iid, c.name as cname, cd.name as cdname, i.comment, s.name as sname, st.name as stname, st.id as stid, i.imageurl ';
			string += 'from item i left outer join item_type it on(i.id_item_type = it.id) ';
			string += 'left outer join item_status s on(i.id_item_status = s.id) ';
			string += 'left outer join contact c on (i.id_contact_as_producer = c.id) ';
			string += 'left outer join station st on (i.id_station = st.id) ';
			string += 'left outer join contact cd on (i.id_contact_as_owner = cd.id) WHERE i.id_item_status < 4 ORDER BY it.name ASC';
			
	helper = getService.getAll(string ,function (err, result) {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query'});
		}
	});

});

router.get('/api/getItemById/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out ID'});
	}

		var string = 'select it.name as itname, i.id as iid, c.name as cname, cd.name as cdname, i.comment, s.name as sname, st.name as stname, s.id as sid, i.imageurl ';
			string += 'from item i left outer join item_type it on(i.id_item_type = it.id) ';
			string += 'left outer join item_status s on(i.id_item_status = s.id) ';
			string += 'left outer join contact c on (i.id_contact_as_producer = c.id) ';
			string += 'left outer join station st on (i.id_station = st.id) ';
			string += 'left outer join contact cd on (i.id_contact_as_owner = cd.id) WHERE i.id = ($1)';
		var value = [req.params.id];

		helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '});
		}
	});

});

router.get('/api/getItemInfo/:id', function (req, res, next) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Please fill out ID'});
	}
		var string = 'SELECT * FROM item WHERE id =($1)';
		var value = [req.params.id];

		helper = getService.getByValue(string, value, function (err, result) {
		if (result) {
			return res.status(200).json(result[0]);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
		
});

module.exports = router;