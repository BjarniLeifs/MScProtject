const express = require('express');
const router = express.Router();
const riService = require('./../models/reports_info');

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

// Returns the info of a report information with the given report id
router.get('/category/:categoryID/report/:reportID', (req, res) => {
  "user strict";
  riService.getReportsInfoByCategoryIdAndReportId(req.params.categoryID, req.params.reportID,
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
/*
  if (typeof req.body.Answer === 'string' || req.body.Answer instanceof String)
    console.log(req.body.Answer);
  else
    console.log("what the fuck ... no it is not a string");
*/

  riService.create(req.body.ProjectID,
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
