var express = require('express');
var router = express.Router();
/* Connecting to helper users for auth on salt hash and so forth.. */
var authService = require('../../helpers/users');
var getHelper = require('../../helpers/get/getAll');
var putHelper = require('../../helpers/put/putAll');
var usersHelper = require('../../helpers/users');

/* User update his own info. */
router.put('/api/updateUser', function (req, res, next) {
	// if req.body.id === token.id .... s.s. tryggja að notandi sé sem hann þykist vera.
	var auditid = usersHelper.decodeJWT(req);
	var string = 'Update users SET username = ($1), name = ($2), address = ($3), ';
		string += 'comments = ($4), company = ($5), email = ($6), phone = ($7), ';
		string += 'roles = ($8), audit_id = ($9), isadmin=($11), isactive=($12), isreader = ($13), iswriter =($14), ismoderator =($15) where id = ($10) returning *';
	var value = [req.body.username, req.body.name, req.body.address, 
				req.body.comments, req.body.company, req.body.email, 
				req.body.phone, req.body.roles, auditid.id, req.body.id, req.body.isadmin, req.body.isactive, req.body.isreader, req.body.iswriter, req.body.ismoderator];
	addHelper = putHelper.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to update user.'});
			
			} else {
				return res.status(200).json(results[0]);
			}
		}
	);	
});
router.put('/api/updatePicture', function (req, res, next) {
	// if req.body.id === token.id .... s.s. tryggja að notandi sé sem hann þykist vera.
	var string = 'Update users SET imageurl = ($1) where name = ($2)';
	var value = [req.body.imageurl, req.body.name];
	addHelper = putHelper.putValue(string, value,
		function (err, results) {
			if (err) {
				return res.status(400).json({message: 'Error occured when trying to add area.'});
			
			} else {
				return res.status(200).json(results[0]);
			}
		}
	);	
});

router.put('/api/updateUserPassword', function (req, res, next) {
	console.log(req.body);
	if (!req.body.oldPassword || !req.body.newPassword || !req.body.confirmPassword) {
		return res.status(400).json({message: 'Please fill out all fields.'});
	}
	var auditid = usersHelper.decodeJWT(req);
	var passObject = usersHelper.setPassword(req.body.newPassword);
	var table = 'users';
	var string ='SELECT * FROM '+ table + ' WHERE id = ($1)';
	var value = [auditid.id];
	helper = getHelper.getByValue(string, value, function (err, result) {
		if (err) {
			return res.status(400).json({message: 'Error running query to '+ table});
		} else {
			if (result) {
				console.log(result[0]);
				/* Check if user is active or not... if not he can not login. */
				if (result[0].isactive) {
					var validObject = result[0];
					/* Check if password is valid. */
					if (authService.validPassword(req.body.oldPassword, validObject)) {
						if(req.body.newPassword === req.body.confirmPassword) {
							
							
							var stringPass = 'Update users SET salt = ($1), hash = ($2) where id = ($3)';
							var valuePass = [passObject.salt, passObject.hash, auditid.id];
							addHelper = putHelper.putValue(stringPass, valuePass,
								function (err, results) {
									if (err) {
										return res.status(400).json({message: 'Error occured when trying to add area.'});
									
									} else {
										return res.status(200).json({message: 'Password successfully changed.'});
									}
								}
							);	
						
						} else {
							return res.status(422).json({message: 'New password and confirm password did not match'});
						}
					} else {
						return res.status(422).json({message: 'You entered wrong password.'});
					}
				} else {
					res.status(422).json({message: 'This user is not active. Contact administrator'});
				}
			} else {
				res.status(404).json({message: 'No such user.'});
			}
		}
	});
});

module.exports = router;
