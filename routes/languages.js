const express = require('express');
const router = express.Router();
const languageService = require('./../models/languages');
/**
 * @api {get} /api/language/ Get languages.
 * @apiVersion 1.0.0
 * @apiName GetAll
 * @apiGroup Languages
 *
 * @apiDescription Returns a list of all languagesm.
 *
 * @apiParam {None}  username 			No parameters required.
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X Get http://localhost:3001/api/language/
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *	   {
 *      {
 *      "id" : 1,
 *      "name": 'xxxxxx.'
 * 
 *      },
 *      .....
 * 	   }
 *
 */
router.get('/', (req, res) => {
	"user strict";
	languageService.get(
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
 * @api {get} /api/language/:id Get languages by id.
 * @apiVersion 1.0.0
 * @apiName GetById
 * @apiGroup Languages
 *
 * @apiDescription Returns the info of a language with the given id.
 *
 * @apiParam {Number}  id       The id of the language
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X Get http://localhost:3001/api/language/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id" : 1,
 *      "name": 'xxxxxx.'
 *     }
 *
 */
router.get('/:id', (req, res) => {
	"user strict";
  if (!req.params.id)
    return res.status()
            .json({ message :  "Please provide id in url parameter!" });

	languageService.getLanguageByID(req.params.id,
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
 * @api {get} /api/language/name/:name Get languages by id.
 * @apiVersion 1.0.0
 * @apiName GetByName
 * @apiGroup Languages
 *
 * @apiDescription Returns the info of a language with the given name.
 *
 * @apiParam {String}  name   The name of the language
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X Get http://localhost:3001/api/language/name/xyz
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id" : 13,
 *      "name": 'xyz.'
 *     }
 *
 */
router.get('/name/:name', (req, res) => {
	"user strict";
  if (!req.params.name) 
    return res.status()
            .json({ message :  "Please provide name in url parameter!" });

	languageService.getLanguageByName(req.params.name,
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
 * @api {post} /api/language Adds language.
 * @apiVersion 1.0.0
 * @apiName PostLanguage
 * @apiGroup Languages
 *
 * @apiDescription Adds a new language to the database.
 *
 * @apiParam {String}  name   The name of the language
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X post http://localhost:3001/api/language
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id" : 13,
 *      "name": 'xyz.'
 *     }
 *
 */
router.post('/', (req, res) => {
	"user strict";
  if (!req.body.name) 
    return res.status(400)
            .json({ message: "please provide name" });
	
  languageService.create(req.body,
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
 * @api {put} /api/language Updates language.
 * @apiVersion 1.0.0
 * @apiName PutLanguage
 * @apiGroup Languages
 *
 * @apiDescription Updates the languagee.
 *
 * @apiParam {Number}  id     The id of the language
 * @apiParam {String}  name   The name of the language
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X put http://localhost:3001/api/language
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id" : 13,
 *      "name": 'xyz.'
 *     }
 *
 */
router.put('/', (req, res) => {
	"user strict";
  if (!req.body.id)
    return res.status(400)
            .json({ message: "please provide id" });

  if (!req.body.name)
    return res.status(400)
            .json({ message: "please provide name" });


	languageService.update(req.body,
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
 * @api {delete} /api/language/:id Removes language.
 * @apiVersion 1.0.0
 * @apiName DeleteLanguage
 * @apiGroup Languages
 *
 * @apiDescription Deletes the language with the given id.
 *
 * @apiParam {Number}  id   The id of the language
 *
 * @apiPermission None
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X delete http://localhost:3001/api/language/1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id" : 13,
 *      "name": 'xyz.'
 *     }
 *
 */
router.delete('/:id', (req, res) => {
	"user strict";
  if (!req.params.id)
    return res.status(400)
            .json({ message: "please provide id in parameter" });

	languageService.delete(req.params.id,
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