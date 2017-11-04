const express = require('express');
const router = express.Router();
const rqService = require('./../models/rames_feedback_questions');


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