const express = require('express');
const router = express.Router();
const riService = require('./../models/rames_info');
/**
 * @api {get} /api/ramesinfo Get rames category.
 * @apiVersion 1.0.0
 * @apiName Getri
 * @apiGroup Rames Info
 *
 * @apiDescription Returns a list of all information.
 *
 * @apiParam {None}  -      No parameters required.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramesinfo
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { 
 *      {
 *        ID                  : 1,
 *        Name                : "some name",
 *        Info                : "some info"
 *        QuestionExplanation : "some explanation on the question",
 *        languageID          : 1,
 *        CategoryID          : 1
 *      },
 *     ....
 *     }
 *
 */
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


/**
 * @api {get} /api/ramesinfo/:id Get rames category by id.
 * @apiVersion 1.0.0
 * @apiName Getribid
 * @apiGroup Rames Info
 *
 * @apiDescription Returns the info with the given id.
 *
 * @apiParam {Number}  id      The id of the information.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramesinfo/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        ID                  : 1,
 *        Name                : "some name",
 *        Info                : "some info"
 *        QuestionExplanation : "some explanation on the question",
 *        languageID          : 1,
 *        CategoryID          : 1
 *      }
 *
 */
router.get('/:id', (req, res) => {
  "user strict";
  if (!req.params.id)
    return res.status(400)
        .json({ message: "Please provide id." });
  riService.getRamesInfoByID(req.params.id,
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
/**
 * @api {get} /api/ramesinfo/:id Get rames info by category id.
 * @apiVersion 1.0.0
 * @apiName Getridsbid
 * @apiGroup Rames Info
 *
 * @apiDescription Returns the category with the given id.
 *
 * @apiParam {Number}  categoryId      The id of the category.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramesinfo/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        ID                  : 1,
 *        Name                : "some name",
 *        Info                : "some info"
 *        QuestionExplanation : "some explanation on the question",
 *        languageID          : 1,
 *        CategoryID          : 1
 *      }
 *
 */
router.get('/category/:categoryId', (req, res) => {
  "user strict";
  if (!req.params.categoryId)
    return res.status(400)
        .json({ message: "Please provide categoryId." });

  riService.getRamesInfoByCategoryID(req.params.categoryId,
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
/**
 * @api {get} /api/ramesinfo/language/:languageId Get rames info language by language id.
 * @apiVersion 1.0.0
 * @apiName Getridsbdlid
 * @apiGroup Rames Info
 *
 * @apiDescription Returns the language information with the given id.
 *
 * @apiParam {Number}  languageId      The id of the language.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramesinfo/language/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        ID                  : 1,
 *        Name                : "some name",
 *        Info                : "some info"
 *        QuestionExplanation : "some explanation on the question",
 *        languageID          : 1,
 *        CategoryID          : 1
 *      }
 *
 */
router.get('/language/:languageId', (req, res) => {
  "user strict";
  if (!req.params.languageId)
    return res.status(400)
        .json({ message: "Please provide languageId." });
   
  riService.getRamesInfoByLanguageID(req.params.languageId,
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
/**
 * @api {post} /api/ramesinfo Adds a new information.
 * @apiVersion 1.0.0
 * @apiName Getriadd
 * @apiGroup Rames Info
 *
 * @apiDescription Adds a new information to the database
 *
 * @apiParam {String}  Name                 The name of the information.
 * @apiParam {String}  QuestionExplanation  The explanation of the question.
 * @apiParam {String}  Info                 The information.
 * @apiParam {Number}  languageId           The id of the language.
 * @apiParam {Number}  categoryId           The id of the category.
 * 
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X post http://localhost:3001/api/ramesinfo
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { 
 *        ID                  : 1,
 *        Name                : "some name",
 *        Info                : "some info"
 *        QuestionExplanation : "some explanation on the question",
 *        languageID          : 1,
 *        CategoryID          : 1
 *     }
 *
 */
router.post('/', (req, res) => {
  "user strict";
  if (!req.body.Name)
    return res.status(400)
        .json({ message: "Please provide Name." });
  if (!req.body.QuestionExplanation)
    return res.status(400)
        .json({ message: "Please provide QuestionExplanation." });
  if (!req.body.Info)
    return res.status(400)
        .json({ message: "Please provide Info." });
  if (!req.body.languageID)
    return res.status(400)
        .json({ message: "Please provide languageID." });
  if (!req.body.CategoryID)
    return res.status(400)
        .json({ message: "Please provide CategoryID." });  

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
/**
 * @api {put} /api/ramesinfo Update the information.
 * @apiVersion 1.0.0
 * @apiName Getriupdate
 * @apiGroup Rames Info
 *
 * @apiDescription Updates the information
 *
 * @apiParam {Number}  ID                   The id of the information.
 * @apiParam {String}  Name                 The name of the information.
 * @apiParam {String}  QuestionExplanation  The explanation of the question.
 * @apiParam {String}  Info                 The information.
 * @apiParam {Number}  languageId           The id of the language.
 * @apiParam {Number}  categoryId           The id of the category.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X put http://localhost:3001/api/ramesinfo
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { 
 *        ID                  : 1,
 *        Name                : "some name",
 *        Info                : "some info"
 *        QuestionExplanation : "some explanation on the question",
 *        languageID          : 1,
 *        CategoryID          : 1
 *     }
 *
 */
router.put('/', (req, res) => {
  "user strict";
  if (!req.body.id)
    return res.status(400)
        .json({ message: "Please provide id." });
  if (!req.body.Name)
    return res.status(400)
        .json({ message: "Please provide Name." });
  if (!req.body.QuestionExplanation)
    return res.status(400)
        .json({ message: "Please provide QuestionExplanation." });
  if (!req.body.Info)
    return res.status(400)
        .json({ message: "Please provide Info." });
  if (!req.body.languageID)
    return res.status(400)
        .json({ message: "Please provide languageID." });
  if (!req.body.CategoryID)
    return res.status(400)
        .json({ message: "Please provide CategoryID." });  
    
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
/**
 * @api {delete} /api/ramesinfo/:id Deletes the information.
 * @apiVersion 1.0.0
 * @apiName delridel
 * @apiGroup Rames Info
 *
 * @apiDescription Deletes the information with the given id
 *
 * @apiParam {Number}  Id       The id of information
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X delete http://localhost:3001/api/ramesinfo/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { 
 *     "Deleted ramesinfo successfully"
 *     }
 *
 */
router.delete('/:id', (req, res) => {
  "user strict";
  if (!req.params.id)
    return res.status(400)
        .json({ message: "Please provide id." });
        
  riService.delete(req.params.id,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else 
        return res.status(result.status)
            .json({ message: result.message });
      }
    );
});
module.exports = router;