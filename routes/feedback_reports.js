const express = require('express');
const router = express.Router();
const rService = require('./../models/reports');
const riService = require('./../models/reports_info');
const jwttoken = require('./../library/authentication');

// Returns a list of all reports
router.get('/', (req, res) => {
  "user strict";
 
  let token = jwttoken.decodeJWT(req);

  rService.get(token.userid,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });

      if (result.data.length > 0)
        return res.status(result.status)
            .json( result.data );
      else 
        return res.status(404)
            .json({message: 'No report found'});
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
router.get('/project/:projectID', (req, res) => {
  "user strict";
 
  let token = jwttoken.decodeJWT(req);

  rService.getReportByProjectId(req.params.projectID, token.userid,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });

      if (result.data.length > 0)
        return res.status(result.status)
            .json( result.data );
      else 
        return res.status(404)
            .json({message: 'No report found'});
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

  let token = jwttoken.decodeJWT(req);
  rService.create(req.body, token.userid,
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
  rService.delete(req, req.params.id,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else {
          riService.deleteReportInfoInReport(req.params.reportID,
            (err, results) => {
              if (err)
                return res.status(results.status)
                          .json({ message: results.message });
              /*else 
                return res.status(result.status)
                          .json( result.data );
            */
            }
          ); 
          return res.status(result.status)
              .json( result.data );
      }
    }
    ); 
});
module.exports = router;