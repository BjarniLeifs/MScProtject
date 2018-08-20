## library
Here we have all sort of code that we use for the project. 

### authentication.js

Here we generate, reset, decode the json we token, and more. 

I suggest that you go to jwt.io to read on those tokens.

The userid is the id of the user. 
The username is the username of the users.
The name is the name of the user. 
The scopes are the access rights of the users
The exp is the expire date of the token. 

config.secret is the secret key that can be found in configuration file in config and is used to sign the key to be verified later when the front end and the back end is communicating. 

All users are given the scope users, however, if you want to expand this you need to define the roles yourself and push them in scope array and attach them to the token. 

Then to close of routes with access rights we need to call another functions that is called scopes in scopes.js see below. 

### dates.js

This file contains simple code to get min, months yeras and so on. 

### dbLibrary.js

This file is used to build a query for the database, with or without values. This is so that you do not have to write the same code over and over again. 

### mail.js

This file contains logic to reset password and to confirm password. with email. 

### queryBuilder.js

The idea of this file was to make a query builder that you sent an array of things into it to get sql string. 

### scopes.js

This file contains the access logic to check if the user has sufficient rights for the things he is requesting. 
```
  Scopes: (scopes) => {
    return (req, res, next) => {
      /* Get from scope in request (req) payload. */
      let tokenScopes = req.payload.scopes;
      /* Checking for every scope, for val in scope and return it */
      let check = _.every(scopes, (val) => {
          return _.contains(tokenScopes, val);
      });
      /* If no Check! return 401 */
      if (!check) {
          return res.send(401, 'insufficient rights');
      } else {
          next();
      }
    };
  },
```

Here he gets the token and checks the scopes, then he checks if the value that is sent to it aswell is within the scope, if no, no access. 

In order to use this we attach this to route that we want to control access to. remember to define the const of scopes. const access = require('...pathtofile'); 

e.g. 
```
router.get('/', access.Scopes("requred scope access defined") (req, res) => {
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
```

### WizardOfOz.js

work in progress. 