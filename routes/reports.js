const express = require('express');
const router = express.Router();
const rService = require('./../models/reports');
/**
 * @api {post} /auth/register Register user.
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Authentication
 *
 * @apiDescription This request is to register user within the system.
 *
 * @apiParam {String}  username       The choosen username of the user.
 * @apiParam {String}  password           The choosen password of the user.
 * @apiParam {String}  confirmPassword    Confirmed password from user.
 * @apiParam {String}  name             The name of the user.
 * @apiParam {String}  email              Valid e-mail from the user.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: routerlication/json" -X POST -d '{"username":"xyz","password":"xyz","confirmPassword":"xyz","name":"xyz","email":"xyz@example.io" }' http://localhost:3001/auth/register
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "message": 'User added succesfully.'
 *     }
 *
 * @apiError Error    Error acurr while running query.
 * @apiError NoResult   Error while trying to add user. 
 * @apiError Exist    The username already exist.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "Username already exists"
 *     }
 *
 */
// Returns a list of all reports
router.get('/', (req, res) => {
  "user strict";
  rService.get(
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

// Returns a report with the given id.
router.get('/:id/', (req, res) => {
  "user strict";
  rService.getReportByID(req.params.id,
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

// Returns the reports of a user with the given ID
router.get('/user/:userID/', (req, res) => {
  "user strict";
  rService.getReportsByUserID(req.params.userID, 
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

// Returns the reports of a user with the given id and of the report type with the given report type id
router.get('/user/:userID/type/:reportTypeID/', (req, res) => {
  "user strict";
  let data = {
    userID : req.params.userID,
    reportTypeID : req.params.reportTypeID
  };
  rService.getReportsByReportTypeID(data,
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

// Adds a new report to the database
router.post('/', (req, res) => {
  "user strict";
  rService.create(req.body,
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

// Updates the report
router.put('/', (req, res) => {
  "user strict";
  rService.update(req.body,
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

// Deletes the report with the given id
router.delete('/:id', (req, res) => {
  "user strict";
  rService.delete(req.params.id,
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