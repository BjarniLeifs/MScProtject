const express = require('express');
const router = express.Router();
const rcService = require('./../models/rames_category');
/**
 * @api {get} /api/ramescategory Get rames category.
 * @apiVersion 1.0.0
 * @apiName Getrc
 * @apiGroup Rames category
 *
 * @apiDescription Returns a list of all categories.
 *
 * @apiParam {None}  -      No parameters required.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramescategory
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { 
 *      {
 *        ID            : 1,
 *        category      : "some text",
 *        info          : "some text",
 *        languageID    : 1,
 *        sequenceNumber: 1
 *      },
 *     ....
 *     }
 *
 */
router.get('/', (req, res) => {
  "user strict";
  rcService.get(
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
 * @api {get} /api/ramescategory/:id Get rames category by id.
 * @apiVersion 1.0.0
 * @apiName Getrcbid
 * @apiGroup Rames category
 *
 * @apiDescription Returns the category with the given id.
 *
 * @apiParam {Number}  id      The id of the category.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramescategory/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        ID            : 1,
 *        category      : "some text",
 *        info          : "some text",
 *        languageID    : 1,
 *        sequenceNumber: 1
 *      }
 *
 */
router.get('/:id', (req, res) => {
  "user strict";
  if (!req.params.id)
    return res.status(400)
        .json({ message: "Please provide id." });

  rcService.getRamesCategoryByID(req.params.id,
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
 * @api {get} /api/ramescategory/ordered/sequenceNumber Get rames category order by sequencenumber
 * @apiVersion 1.0.0
 * @apiName Getrcordersn
 * @apiGroup Rames category
 *
 * @apiDescription Returns the category sequencenumber sorted asc.
 *
 * @apiParam {None}  -      No parameters required.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramescategory/ordered/sequenceNumber
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        ID            : 1,
 *        category      : "some text",
 *        info          : "some text",
 *        languageID    : 1,
 *        sequenceNumber: 1
 *      }
 *
 */
router.get('/ordered/sequenceNumber', (req, res) => {
  "user strict";
  rcService.getOrderedCategory(
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
 * @api {get} /api/ramescategory/language/:languageid Get rames category by languageid.
 * @apiVersion 1.0.0
 * @apiName Getrcblid
 * @apiGroup Rames category
 *
 * @apiDescription Returns categories with given language.
 *
 * @apiParam {Number}  languageid      The id of the language.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramescategory/language/:languageid
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        ID            : 1,
 *        category      : "some text",
 *        info          : "some text",
 *        languageID    : 1,
 *        sequenceNumber: 1
 *      }
 *
 */
router.get('/language/:languageid', (req, res) => {
  "user strict";
  if (!req.params.languageid)
    return res.status(400)
        .json({ message: "Please provide languageid." });
  rcService.getAllRamesCategoryByLanguageID(req.params.languageid,
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
 * @api {get} /api/ramescategory/:id/language/:languageid Get rames category by languageid and category id.
 * @apiVersion 1.0.0
 * @apiName Getrcblidandid
 * @apiGroup Rames category
 *
 * @apiDescription Returns  categories with given languageid and categoryid.
 *
 * @apiParam {Number}  id              The id of the category.
 * @apiParam {Number}  languageid      The id of the language.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X get http://localhost:3001/api/ramescategory/1/language/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        ID            : 1,
 *        category      : "some text",
 *        info          : "some text",
 *        languageID    : 1,
 *        sequenceNumber: 1
 *      }
 *
 */
router.get('/:id/language/:languageid', (req, res) => {
  "user strict";
  if (!req.params.id)
    return res.status(400)
        .json({ message: "Please provide id." });
  if (!req.params.languageid)
    return res.status(400)
        .json({ message: "Please provide languageid." });
        
  var data = {
    id: req.params.id,
    languageID: req.params.languageid
  };

  rcService.getRamesCategoryByLanguageID(data,
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
 * @api {post} /api/ramescategory Adds a new category.
 * @apiVersion 1.0.0
 * @apiName GetrCadd
 * @apiGroup Rames category
 *
 * @apiDescription Adds a new category to the database
 *
 * @apiParam {String}  category            The name of the category.
 * @apiParam {Text}    info                The information on category.
 * @apiParam {Number}  languageID          The id of the language.
 * @apiParam {Number}  sequenceNumber      The sequence number of the category.
 * 
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X post http://localhost:3001/api/ramescategory
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { 
 *        ID            : 1,
 *        category      : "some text",
 *        info          : "some text",
 *        languageID    : 1,
 *        sequenceNumber: 1
 *     }
 *
 */
router.post('/', (req, res) => {
  "user strict";
  if (!req.body.category)
    return res.status(400)
        .json({ message: "Please provide category name." });
  if (!req.body.info)
    return res.status(400)
        .json({ message: "Please provide info." });
  if (!req.body.languageID)
    return res.status(400)
        .json({ message: "Please provide languageID." });
  if (!req.body.sequenceNumber)
    return res.status(400)
        .json({ message: "Please provide sequenceNumber." });  


  rcService.create(req.body,
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
 * @api {put} /api/ramescategory Update the category.
 * @apiVersion 1.0.0
 * @apiName GetrCupdate
 * @apiGroup Rames category
 *
 * @apiDescription Updates the category
 *
 * @apiParam {Number}  Id                  The id of category
 * @apiParam {String}  category            The name of the category.
 * @apiParam {Text}    info                The information on category.
 * @apiParam {Number}  languageID          The id of the language.
 * @apiParam {Number}  sequenceNumber      The sequence number of the category.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X put http://localhost:3001/api/ramescategory
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { 
 *        ID            : 1,
 *        category      : "some text",
 *        info          : "some text",
 *        languageID    : 1,
 *        sequenceNumber: 1
 *     }
 *
 */
// Updates the category
router.put('/', (req, res) => {
  "user strict";
  if (!req.body.id)
    return res.status(400)
        .json({ message: "Please provide id." });
  if (!req.body.category)
    return res.status(400)
        .json({ message: "Please provide category name." });
  if (!req.body.info)
    return res.status(400)
        .json({ message: "Please provide info." });
  if (!req.body.languageID)
    return res.status(400)
        .json({ message: "Please provide languageID." });
  if (!req.body.sequenceNumber)
    return res.status(400)
        .json({ message: "Please provide sequenceNumber." });  

  rcService.update(req.body,
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
 * @api {delete} /api/ramescategory/:id Deletes the category.
 * @apiVersion 1.0.0
 * @apiName delrCdel
 * @apiGroup Rames category
 *
 * @apiDescription Deletes the category with the given id
 *
 * @apiParam {Number}  Id       The id of category
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X delete http://localhost:3001/api/ramescategory/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { 
 *     "Deleted question radio choice successfully"
 *     }
 *
 */
router.delete('/:id', (req, res) => {
  "user strict";
  if (!req.params.id)
    return res.status(400)
        .json({ message: "Please provide id." });
        
  rcService.delete(req.params.id,
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