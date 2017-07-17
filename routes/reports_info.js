const express = require('express');
const router = express.Router();
const riService = require('./../models/reports_info');
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
 * curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz","confirmPassword":"xyz","name":"xyz","email":"xyz@example.io" }' http://localhost:3001/auth/register
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
// Returns a list of all report information
router.get('/', (req, res) => {
  "user strict";
  riService.get(
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

// Returns the info of a report information with the given id
router.get('/:id', (req, res) => {
  "user strict";
  riService.getReportsInfoByID(req.params.id,
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

// Returns the info of a report information with the given report id
router.get('/report/:reportID', (req, res) => {
  "user strict";
  riService.getReportsInfoByReportID(req.params.reportID,
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

// Returns the info of a report information with the given question id
router.get('/question/:questionID', (req, res) => {
  "user strict";
  riService.getReportsInfoByQuestionID(req.params.reportID,
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

router.get('/report/:reportID/question/:questionID', (req, res) => {
  "user strict";
    let data = {
      reportID : req.params.reportID,
      questionID : req.params.questionID
    };
    riService.getReportQuestionInfoByReportID(data,
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

// Adds a new report information to the database
router.post('/', (req, res) => {
  "user strict";
  riService.create(req.body,
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

// Updates the report information
router.put('/', (req, res) => {
  "user strict";
  riService.update(req.body,
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

// Deletes the report information with the given id
router.delete('/:id', function(req, res) {
  "user strict";
  riService.delete(req.params.id,
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

router.delete('/report/:reportID', function(req, res) {
  "user strict";
  riService.deleteReportInfoInReport(req.params.reportID,
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