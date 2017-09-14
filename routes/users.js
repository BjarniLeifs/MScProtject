
const express = require('express');
const router = express.Router();
const uService = require('./../models/users');
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

// Returns a list of all users
router.get('/', (req, res) => {
  "use strict";
  uService.get(
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

// Returns the info of a user with the given id
router.get('/:id/', (req, res) => {
  "use strict";
  uService.getUserByID(req.params.id,
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
  "use strict";
  uService.update(req.body,
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
  "use strict";
  uService.delete(req.params.id,
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

// Returns the user with the given token
router.get('/token/:token/', (req, res) => {
  "use strict";
  uService.getUserByToken(req.params.token,
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
