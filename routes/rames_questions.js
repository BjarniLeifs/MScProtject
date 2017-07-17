const express = require('express');
const router = express.Router();
const rqService = require('./../models/rames_questions');
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

router.get('/', (req, res) => {
  "user strict";
  rqService.get(
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

router.get('/:id', (req, res) => {
  "user strict";
  rqService.getRamesQuestionByID(req.params.id,
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

// Create the route '/api/ramesquestion/:id/category/:categoryID. 
// Returns a given rames question in the given category

// Create the route '/api/ramesquestion/:id/language/:languageID.
// Returns a given rames question in the given language.

router.get('/category/:categoryId', (req, res) => {
  "user strict";
  rqService.getRamesQuestionByCategoryID(req.params.categoryId,
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

router.get('/language/:languageId', (req, res) => {
  "user strict";
  rqService.getRamesQuestionByLanguageID(req.params.languageId,
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
  rqService.create(req.body,
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

// Updates the user
router.put('/', (req, res) => {
  "user strict";
  rqService.update(req.body,
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

// Deletes the user with the given id
router.delete('/:id/', (req, res) => {
  "user strict";
  rqService.delete(req.params.id,
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