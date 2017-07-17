/* Each file has it's own scope there for basic stuff is needed */
/* Using express */
var express = require('express');

/* Making router */
var router = express.Router();

/* Information about what is posible to use.
 get , post, pull, del, etc...
 req = request, res = response, next = used if making middleware or jump out of 
 The current function, otherwise it might be infinite loop and server will never
 Stop in that particular function, unless timedout or stoped in someway...
 Please google for more information about render, send, json and other things
 That is possible to use this is API of express. 
*/
/* GET home page. Only just used for test */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* Returning calls to whom ever called. */
module.exports = router;