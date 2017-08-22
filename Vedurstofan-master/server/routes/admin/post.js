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
var jwttoken = require('../../helpers/users');


/* Need to lock this for admin scope only in the future. */
router.post('/register', function (req, res, next) {
	/* USERNAME should be lowerCASE! to ensure we get unique names at all times. */
	var resUser = [req.body.username];
	/* Getting salt and hash to put in database with user */
	var passObject = authService.setPassword(req.body.password);
	var returnMe = [];
	/* Defingin and looking for user with username before I can add to database.*/
	var table = 'users';
	var string = 'select * from ' + table +' WHERE username = ($1)';
	/* Calling for that user if exist it prompt the result else insert into database. */
	helper = getService.getByValue(string,resUser, 
		function (err, result) {
			if (result.length < 1) {
				/* Defining the string to pass to helper for insert */
				var stringAdd = 'INSERT INTO users (username, name, roles, company, phone, email,';
					stringAdd +=' address, comments, hash, salt, isadmin, isactive, imageurl, isreader,';
					stringAdd +=' iswriter, ismoderator, audit_id) VALUES($1, $2, $3, $4, $5, $6, $7,';
					stringAdd +=' $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning *';
				var auditid = jwttoken.decodeJWT(req);

				/* Defining values to insert */
				var value = [req.body.username, req.body.name, req.body.roles, req.body.company, req.body.phone, 
							req.body.email, req.body.address, req.body.comments, passObject.hash, passObject.salt, 
							req.body.isadmin, req.body.isactive, req.body.photoUrl, req.body.isreader, req.body.iswriter, 
							req.body.ismoderator, auditid.id];
				/* Calling postService to add values with string constrains */
				addHelper = postService.postValue(stringAdd, value,
					function (err, results) {
						if (results) {
							return res.status(200).json({message: 'User added succesfully.'});
						} else {
							return res.status(400).json({message: 'Error adding user.'});
						}
					}
				);
			} else {
				for (var i = 0; i < result.length; i++){
					/* User was found, returning to user for his knowladge */
					if(result[i].username === req.body.username){
						return res.status(400).json({message: 'Username already exists, with email ' + result[i].email + '.'});
					}
				}
			}
		}
	);
});


module.exports = router;




