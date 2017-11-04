const express = require('express');
const router = express.Router();
const pService = require('./../models/project');
const jwttoken = require('./../library/authentication');


// Gets all project that users owns.
router.get('/', (req, res) => {
  "use strict";
  let token = jwttoken.decodeJWT(req);

  pService.getProjectByUserId(token.userid,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({message: result.message});
      else
        return res.status(result.status)
            .json(result.data);
    });
});
// Gets project of spesific id that user must own. 


router.get('/:id', (req, res) => {
  "use strict";

  let token = jwttoken.decodeJWT(req);
  let pid = req.params.id;

  pService.getProjectByIdAndUserId(token.userid, pid,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({message: result.message});
      else
        return res.status(result.status)
            .json(result.data);
    });
});
// Adds a new report to the database
router.post('/', (req, res) => {
  "use strict";
  let token = jwttoken.decodeJWT(req);
  let des = 'No description';

  if (!req.body.name)
    return res.satus(400)
        .json({message: 'Need to provide name'});
  if (req.body.description)
    des = req.body.description;

  let value = {
    name: req.body.name,
    description: des,
    userid: token.userid
  };

  pService.create(value,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else 
        return res.status(result.status)
            .json(result.data);
      }
    ); 
});

router.put('/', (req, res) => {
  "use strict";

  let token = jwttoken.decodeJWT(req);
  if (req.body.UserID != token.userid)
    return res.status(403)
        .json({message: 'Id did not match with project userid'});
  let save = {
    id : req.body.ID,
    name: req.body.Name,
    description: req.body.Description,
    userid : req.body.UserID
  };
  
  pService.update(save, 
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({message: result.message});
      else
        return res.status(result.status)
            .json(result.data);
    }
  );
});

// Deletes the report with the given id
router.delete('/:id', (req, res) => {
  "user strict";
  let token = jwttoken.decodeJWT(req);
  let pid = req.params.id;
  
  pService.getProjectByIdAndUserId(token.userid, pid,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({message: result.message});
      else {
        if (result.data[0].UserID === token.userid)
          pService.delete(pid, req, 
            (err, result) => {
              if (err)
                return res.status(result.status)
                  .json({ message: result.message });
              else 
                return res.status(result.status)
                  .json( result.data );
            }
          );
        else
          return res.status(403)
              .json({message: 'This project is not yours.'});
      }  
    });
  }
);

module.exports = router;