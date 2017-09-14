const express = require('express');
const router = express.Router();
const rtService = require('./../models/reports_type');
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
 * curl -H "Content-Type: routerlication/json" -X POST -d '{"username":"xyz","password":"xyz","confirmPassword":"xyz","name":"xyz","email":"xyz@example.io" }' http://localhost:3001/auth/register
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
// Returns a list of all report types
router.get('/', (req, res) => {
  "user strict";

  rtService.get(
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else 
        return res.status(result.status)
            .json( result.data );
      }
    );
});

// Returns the info of a report type with the given id
router.get('/:id', (req, res) => {
  "user strict";

  rtService.getReportTypeByID(req.params.id,
    (err, result) => {
      console.log(result.data[0]);
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else 
        return res.status(result.status)
            .json( result.data );
      }
    ); 
});
// Returns the info of a report type with the given name
router.get('/name/:name', (req, res) => {
  "user strict";
  rtService.getReportTypeByName(req.params.name,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else 
        return res.status(result.status)
            .json( result.data );
      }
    );  
});

// Adds a new report type to the database
router.post('/', (req, res) => {
  "user strict";
  let add = {
    Name : req.body.name,
    Info : req.body.info
  };
  rtService.create(add,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else 
        return res.status(result.status)
            .json( result.data );
      }
    ); 
});

// Updates the report type
router.put('/', (req, res) => {
  "user strict";

  rtService.update(req.body,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else 
        return res.status(result.status)
            .json( result.data );
      }
    ); 
});

// Deletes the report type with the given id
router.delete('/:id', (req, res) => {
  "user strict";
  rtService.delete(req.params.id,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else 
        return res.status(result.status)
            .json( result.data );
      }
    ); 
});
module.exports = router;