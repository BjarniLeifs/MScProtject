const express = require('express');
const router = express.Router();
const rpService = require('./../models/rames_picture');
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
module.exports = router;