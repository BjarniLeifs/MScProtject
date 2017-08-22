var express = require('express');
var router = express.Router();
/* Connecting to helpser users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
/* Loading scopes helper */
var open4 = require('../../helpers/scopes');
/* Definging helper for putting data to database */
var postService = require('../../helpers/post/postAll');
/* Defining helper to get data from database. */
var getService = require('../../helpers/get/getAll');


/* Change password for any user */
router.put('/api/adminChangeUserPassword', function (req, res, next) {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({message: "Please fill out all fields."});
	}
	/* Define what to look for and getting hased and salted password */
	var resUser = [req.body.username];
	var object = authService.setPassword(req.body.password);
	/* If query find use found turns true, index is for index of result if more then one. (just in case)*/
	var found = false;
	var index;
	/* Building up search string to pass to getservice */
	var table = 'users';
	var string = 'select * from ' + table +' WHERE username = ($1)';
	/* Calling for that user if exist it prompt the result else insert into database. */
	var helper = getService.getByValue(string, resUser, 
		function (err, result) {
			if (err) {
				return res.status(400).json({message: 'Error running query.'});
			}
			/* Checking if use was found or not */
			if (result) {
				for (var i = 0 ; i < result.length; i++) {
					if (result[i].username == req.body.username) {
						found = true;
						index = i;
					}
				}
				if (found) {
					/* Building string and value to update in database */
					var stringAdd = 'UPDATE users SET hash = ($1), salt = ($2) WHERE id = ($3) ';
					var value = [object.hash, object.salt, result[index].id];
					/* Passing */
					addHelper = postService.postValue(stringAdd, value,
						function (err, results) {
							if (err) {
								return res.status(400).json({message: 'Error accur when trying to update password for user.'});
								
							} else {
								return res.status(200).json({message: 'User password updated succesfully.'});
							}
						}
					);
				}
			} else {
				res.status(300).json({message: 'Did not find user by that exact name.'});
			}
		}
	);
});

module.exports = router;

