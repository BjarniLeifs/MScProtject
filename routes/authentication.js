const express = require('express');
const router = express.Router();

const userSerivce = require('./../models/users');
const authService = require('./../models/authentication');
const authLibrary = require('./../library/authentication');
const mailLibrary = require('./../library/mail');

/**
 * @api {post} /auth/register Register user.
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Authentication
 *
 * @apiDescription This request is to register user within the system.
 *
 * @apiParam {String}  username 			The choosen username of the user.
 * @apiParam {String}  password          	The choosen password of the user.
 * @apiParam {String}  confirmPassword   	Confirmed password from user.
 * @apiParam {String}  name          		The name of the user.
 * @apiParam {String}  email          		Valid e-mail from the user.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz","confirmPassword":"xyz","name":"xyz","email":"xyz@example.io" }' http://localhost:3001/auth/register
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   {
 *		 "message": 'User added succesfully.'
 * 	   }
 *
 * @apiError Error 		Error acurr while running query.
 * @apiError NoResult 	Error while trying to add user. 
 * @apiError Exist 		The username already exist.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "Username already exists"
 *     }
 *
 */
router.post('/register', (req, res, next) => {
	"use strict";
	if(!req.body.username)
		return res.status(401).json({
			message: 'Please provide username.'
		});
	else if (!req.body.password)
		return res.status(401).json({
			message: 'Please provide password'
		});
	else if (!req.body.confirmPassword)
		return res.status(401).json({
			message: 'Please confirmed password'
		});
	else if (req.body.password != req.body.confirmPassword)
		return res.status(401).json({
			message: 'Passwords did not match, try again.'
		});
	else if (!req.body.name) 
		return res.status(401).json({
			message: 'Please provide a name.'
		});
	else if (!req.body.email)
		return res.status(401).json({
			message: 'Please provide an e-mail.'
		});
	//Calling for that user if exist it prompt the result else insert into database. 
	userSerivce.getFullInfoByUsername(req.body.username, 
		(err, result) => {
			if (err) 
				return res.status(400)
						.json({ message: 'Error running query.' });
			if (result.data.length < 1) {
				authService.register(req, 
					(err, results) => {
						
						if(err)
							return res.status(400)
									.json({ message: 'Error running query.' });

						if (!results.valid)
							return res.status(400)
									.json({ message: 'Error adding user.' });
						else
							return res.status(200)
									.json({ message: 'User added succesfully.' });
				});
			} else {
				// User was found, returning to user for his knowladge
				return res.status(409).json({
					message: 'Username already exists.'
				});	
			}
		}
	);
});

/**
 * @api {post} /auth/login Login user.
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Authentication
 *
 * @apiDescription This request is to login user within the system.
 *
 * @apiParam {String}  username 			The choosen username of the user.
 * @apiParam {String}  password          	The choosen password of the user.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3001/auth/login
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   {
 *		 "token": 'adf0ad.4234k23-þ32423þ.twett.this.is.example'
 * 	   }
 *
 * @apiError Error 		Error acurr while running query.
 * @apiError NoResult 	Error while trying to add user. 
 * @apiError NoUsername There is no such username.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "No such username"
 *     }
 *
 */

router.post('/login', (req, res, next) => {
	"use strict";
	
	if (!req.body.username || !req.body.password)
		return res.status(400)
				.json({ message: 'Please provide username and password.' });
	
	authService.login(req, 
		(err, result) => {
			if (err)
				return res.status(400)
						.json({ message: 'Error running query.' });
			if (result.found) {
				if(result.valid)
					/* If callback true then generate token since everything is okay*/
					return res.status(200)
							.json( { token : authLibrary.generateJWT(result.data.data[0]) });
				else
					return res.status(401)
							.json({ message: 'Incorrect password' });				
			} else {
				return res.status(404).json({
					message: 'No such username'
				});	
			}
		}
	);
});


/**
 * @api {post} /auth/forgotPassword User forgets password.
 * @apiVersion 1.0.0
 * @apiName Forgot password
 * @apiGroup Authentication
 *
 * @apiDescription This request sends e-mail with information to change password if forgotten.
 *
 * @apiParam {String}  email          		Valid e-mail from the user.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST -d '{"email":"xyz@example.io" }' http://localhost:3001/auth/forgotPassword
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   {
 *		 "message": 'E-mail sent to user.'
 * 	   }
 *
 * @apiError Error 		Error acurr while running query.
 * @apiError NoResult 	Error while sending mail. 
 * @apiError NoEmail 	No such email, contact administrator.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "No such email, contact administrator"
 *     }
 *
 */
router.post('/forgotPassword', (req, res, next) => {
	"use strict";
	if (!req.body.email) {
		return res.status(400).json({
			message: 'Please fill out your email!'
		});
	}

	userSerivce.getFullInfoByEmail(req.body.email, 
		(err, result) => {
			if (err)
			return res.status(400)
					.json({ message: 'Error running query.' });
			else {
				/* The result is what comes from the query with accurate information */
				let objectResult = result[0];
				if (objectResult.email === req.body.email) {
					/* Generate new token for resset token and the activate it in database */
					let newToken = {
						token 	 	: authService.generateResetJWT(objectResult),
						tokenExpire : dateService.dateAddMin(60),
						id 			: objectResult.id
					};

					authService.setRsetToken(newToken, 
						(err, results) => {
							if (err)
								return res.status(400)
										.json({ message: 'Error running query' });
							else {
								mailLibrary.sendResetPassEmail(objectResult, newToken, req, 
									(err) => {
										if (err) 
											return res.status(400)
													.json({ message: 'Error when sending mail.' });
									}
								);
								return res.status(200)
										.json({ message: 'E-mail sent to user' });
							}
						}
					);
					
				} else {	
					return res.status(404).json({
						message: 'No such email, contact administrator'
					});
				}
			}
		}
	);
});	


/**
 * @api {post} /auth/reset/:token User resets password.
 * @apiVersion 1.0.0
 * @apiName Reset password
 * @apiGroup Authentication
 *
 * @apiDescription This request should have a token in e-mail that needs to be in the database to work.
 *
 * @apiParam {String}  token Valid token from the system.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST -d '{"password":"xyz", "confirmPassword":"xyz" }' http://localhost:3001/auth/reset/1234.532423.1123123.this.is.example
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   {
 *		 "message": 'Confirmation E-mail sent to user about password is updated.'
 * 	   }
 *
 * @apiError Error 		Error acurr while running query.
 * @apiError Expired 	Token has expired. 
 * @apiError NotValid 	Invalid token.
 * @apiError NotMatched Password did not match
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "Token has expired"
 *     }
 *
 */
/* Get token from users after e-mail was sent to check if the right user, then okei to reset password */
router.post('/reset/:token', (req, res, next) => {
	"use strict";
	let token = req.params.token;
	if (!token) {
		return res.status(400).json({
			message: 'Please provide token'
		});
	}
	if (!req.body.password || !req.body.confirmPassword) {
		return res.status(400).json({
			message: 'Please fill out both password fields.'
		});
	}
	if (req.body.password === req.body.confirmPassword) {
		authService.getResetToken(token, 
			(err, results) => {
				if (err) 
					return res.status(400)
							.json({ message: 'Error fetching client from pool.' });
				
				let today = dateService.dateAddMin(0);	
				if (results.token === token) {
					if (today <= results.tokenExpire) {

						authService.setPassword(results, 
							(err, check) => {
								if(err) 
									return res.status(400)
											.json({ message: 'Error running query' });
								
								if(check){
									mailLibrary.confirmPassReset(results, req);
									return res.status(200)
											.json({ message: 'Confirmation E-mail sent to user about password is updated.' });
								} else {
									return res.status(400)
											.json({ message: 'Something went wrong.' });
								}
						});
					} 
					else
						return res.status(404)
								.json({message: 'Token has expired.'});
				}	
				else 
					return res.status(404).json({message: 'Invalid token'});
			}
		);	
	} 
	else 
		return res.status(400).json({message: 'Password did not match.'});
	 
});
module.exports = router;