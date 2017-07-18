define({ "api": [
  {
    "type": "post",
    "url": "/auth/forgotPassword",
    "title": "User forgets password.",
    "version": "1.0.0",
    "name": "Forgot_password",
    "group": "Authentication",
    "description": "<p>This request sends e-mail with information to change password if forgotten.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail from the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"email\":\"xyz@example.io\" }' http://localhost:3001/auth/forgotPassword",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   {\n\t\t \"message\": 'E-mail sent to user.'\n\t   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while sending mail.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoEmail",
            "description": "<p>No such email, contact administrator.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"No such email, contact administrator\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login user.",
    "version": "1.0.0",
    "name": "Login",
    "group": "Authentication",
    "description": "<p>This request is to login user within the system.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The choosen username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The choosen password of the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"username\":\"xyz\",\"password\":\"xyz\"}' http://localhost:3001/auth/login",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   {\n\t\t \"token\": 'adf0ad.4234k23-þ32423þ.twett.this.is.example'\n\t   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while trying to add user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoUsername",
            "description": "<p>There is no such username.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"No such username\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register user.",
    "version": "1.0.0",
    "name": "Register",
    "group": "Authentication",
    "description": "<p>This request is to register user within the system.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The choosen username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The choosen password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirmed password from user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail from the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"username\":\"xyz\",\"password\":\"xyz\",\"confirmPassword\":\"xyz\",\"name\":\"xyz\",\"email\":\"xyz@example.io\" }' http://localhost:3001/auth/register",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   {\n\t\t \"message\": 'User added succesfully.'\n\t   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while trying to add user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Exist",
            "description": "<p>The username already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"Username already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register user.",
    "version": "1.0.0",
    "name": "Register",
    "group": "Authentication",
    "description": "<p>This request is to register user within the system.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The choosen username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The choosen password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirmed password from user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail from the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: routerlication/json\" -X POST -d '{\"username\":\"xyz\",\"password\":\"xyz\",\"confirmPassword\":\"xyz\",\"name\":\"xyz\",\"email\":\"xyz@example.io\" }' http://localhost:3001/auth/register",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   {\n\t\t \"message\": 'User added succesfully.'\n\t   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while trying to add user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Exist",
            "description": "<p>The username already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"Username already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/report_types.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register user.",
    "version": "1.0.0",
    "name": "Register",
    "group": "Authentication",
    "description": "<p>This request is to register user within the system.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The choosen username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The choosen password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirmed password from user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail from the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"username\":\"xyz\",\"password\":\"xyz\",\"confirmPassword\":\"xyz\",\"name\":\"xyz\",\"email\":\"xyz@example.io\" }' http://localhost:3001/auth/register",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": 'User added succesfully.'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while trying to add user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Exist",
            "description": "<p>The username already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"Username already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/reports_info.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register user.",
    "version": "1.0.0",
    "name": "Register",
    "group": "Authentication",
    "description": "<p>This request is to register user within the system.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The choosen username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The choosen password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirmed password from user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail from the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: routerlication/json\" -X POST -d '{\"username\":\"xyz\",\"password\":\"xyz\",\"confirmPassword\":\"xyz\",\"name\":\"xyz\",\"email\":\"xyz@example.io\" }' http://localhost:3001/auth/register",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": 'User added succesfully.'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while trying to add user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Exist",
            "description": "<p>The username already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"Username already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/reports.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register user.",
    "version": "1.0.0",
    "name": "Register",
    "group": "Authentication",
    "description": "<p>This request is to register user within the system.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The choosen username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The choosen password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirmed password from user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail from the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: routerlication/json\" -X POST -d '{\"username\":\"xyz\",\"password\":\"xyz\",\"confirmPassword\":\"xyz\",\"name\":\"xyz\",\"email\":\"xyz@example.io\" }' http://localhost:3001/auth/register",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   {\n\t\t \"message\": 'User added succesfully.'\n\t   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while trying to add user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Exist",
            "description": "<p>The username already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"Username already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_questions.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register user.",
    "version": "1.0.0",
    "name": "Register",
    "group": "Authentication",
    "description": "<p>This request is to register user within the system.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The choosen username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The choosen password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirmed password from user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail from the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"username\":\"xyz\",\"password\":\"xyz\",\"confirmPassword\":\"xyz\",\"name\":\"xyz\",\"email\":\"xyz@example.io\" }' http://localhost:3001/auth/register",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   {\n\t\t \"message\": 'User added succesfully.'\n\t   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while trying to add user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Exist",
            "description": "<p>The username already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"Username already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_pictures.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register user.",
    "version": "1.0.0",
    "name": "Register",
    "group": "Authentication",
    "description": "<p>This request is to register user within the system.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The choosen username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The choosen password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirmed password from user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid e-mail from the user.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"username\":\"xyz\",\"password\":\"xyz\",\"confirmPassword\":\"xyz\",\"name\":\"xyz\",\"email\":\"xyz@example.io\" }' http://localhost:3001/auth/register",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": 'User added succesfully.'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoResult",
            "description": "<p>Error while trying to add user.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Exist",
            "description": "<p>The username already exist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"Username already exists\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/reset/:token",
    "title": "User resets password.",
    "version": "1.0.0",
    "name": "Reset_password",
    "group": "Authentication",
    "description": "<p>This request should have a token in e-mail that needs to be in the database to work.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Valid token from the system.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"password\":\"xyz\", \"confirmPassword\":\"xyz\" }' http://localhost:3001/auth/reset/1234.532423.1123123.this.is.example",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   {\n\t\t \"message\": 'Confirmation E-mail sent to user about password is updated.'\n\t   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error acurr while running query.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Expired",
            "description": "<p>Token has expired.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotValid",
            "description": "<p>Invalid token.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotMatched",
            "description": "<p>Password did not match</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"message\": \"Token has expired\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "delete",
    "url": "/api/language/:id",
    "title": "Removes language.",
    "version": "1.0.0",
    "name": "DeleteLanguage",
    "group": "Languages",
    "description": "<p>Deletes the language with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the language</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X delete http://localhost:3001/api/language/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\" : 13,\n \"name\": 'xyz.'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/languages.js",
    "groupTitle": "Languages"
  },
  {
    "type": "get",
    "url": "/api/language/",
    "title": "Get languages.",
    "version": "1.0.0",
    "name": "GetAll",
    "group": "Languages",
    "description": "<p>Returns a list of all languagesm.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "None",
            "optional": false,
            "field": "username",
            "description": "<p>No parameters required.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X Get http://localhost:3001/api/language/",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   {\n     {\n     \"id\" : 1,\n     \"name\": 'xxxxxx.'\n\n     },\n     .....\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/languages.js",
    "groupTitle": "Languages"
  },
  {
    "type": "get",
    "url": "/api/language/:id",
    "title": "Get languages by id.",
    "version": "1.0.0",
    "name": "GetById",
    "group": "Languages",
    "description": "<p>Returns the info of a language with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the language</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X Get http://localhost:3001/api/language/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\" : 1,\n \"name\": 'xxxxxx.'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/languages.js",
    "groupTitle": "Languages"
  },
  {
    "type": "get",
    "url": "/api/language/name/:name",
    "title": "Get languages by id.",
    "version": "1.0.0",
    "name": "GetByName",
    "group": "Languages",
    "description": "<p>Returns the info of a language with the given name.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the language</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X Get http://localhost:3001/api/language/name/xyz",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\" : 13,\n \"name\": 'xyz.'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/languages.js",
    "groupTitle": "Languages"
  },
  {
    "type": "post",
    "url": "/api/language",
    "title": "Adds language.",
    "version": "1.0.0",
    "name": "PostLanguage",
    "group": "Languages",
    "description": "<p>Adds a new language to the database.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the language</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X post http://localhost:3001/api/language",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\" : 13,\n \"name\": 'xyz.'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/languages.js",
    "groupTitle": "Languages"
  },
  {
    "type": "put",
    "url": "/api/language",
    "title": "Updates language.",
    "version": "1.0.0",
    "name": "PutLanguage",
    "group": "Languages",
    "description": "<p>Updates the languagee.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the language</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the language</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X put http://localhost:3001/api/language",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\" : 13,\n \"name\": 'xyz.'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/languages.js",
    "groupTitle": "Languages"
  },
  {
    "type": "get",
    "url": "/api/questioncheckboxchoices",
    "title": "Get Question checkbox choices.",
    "version": "1.0.0",
    "name": "GetQCC",
    "group": "Question_checkbox_choices",
    "description": "<p>Returns a list of all question checkbox choices.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "None",
            "optional": false,
            "field": "-",
            "description": "<p>No parameters required.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/questioncheckboxchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n     {\n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Textbox    : \"some text\"\n     },\n\t\t ....\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_checkbox_choices.js",
    "groupTitle": "Question_checkbox_choices"
  },
  {
    "type": "post",
    "url": "/api/questioncheckboxchoices",
    "title": "Adds Question checkbox choices.",
    "version": "1.0.0",
    "name": "GetQCCadd",
    "group": "Question_checkbox_choices",
    "description": "<p>Adds a new question checkbox choices to the database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>The id of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Chooices",
            "description": "<p>The chooices of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Textbox",
            "description": "<p>The information about the question.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X post http://localhost:3001/api/questioncheckboxchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_checkbox_choices.js",
    "groupTitle": "Question_checkbox_choices"
  },
  {
    "type": "delete",
    "url": "/api/questioncheckboxchoices/:id",
    "title": "Delete Question checkbox choices.",
    "version": "1.0.0",
    "name": "GetQCCdel",
    "group": "Question_checkbox_choices",
    "description": "<p>Updates the question checkbox choices</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of choice</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X delete http://localhost:3001/api/questioncheckboxchoices/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n \t \"Deleted question checkbox choice successfully\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_checkbox_choices.js",
    "groupTitle": "Question_checkbox_choices"
  },
  {
    "type": "get",
    "url": "/api/questioncheckboxchoices/:id",
    "title": "Get Question checkbox choices by id.",
    "version": "1.0.0",
    "name": "GetQCCid",
    "group": "Question_checkbox_choices",
    "description": "<p>Returns the info of a question checkbox choices with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of question checkbox choices.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/questioncheckboxchoices/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_checkbox_choices.js",
    "groupTitle": "Question_checkbox_choices"
  },
  {
    "type": "put",
    "url": "/api/questioncheckboxchoices",
    "title": "Update Question checkbox choices.",
    "version": "1.0.0",
    "name": "GetQCCupdate",
    "group": "Question_checkbox_choices",
    "description": "<p>Updates the question checkbox choices</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of choice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>The id of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Chooices",
            "description": "<p>The chooices of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Textbox",
            "description": "<p>The information about the question.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X put http://localhost:3001/api/questioncheckboxchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_checkbox_choices.js",
    "groupTitle": "Question_checkbox_choices"
  },
  {
    "type": "get",
    "url": "/api/questiondropdownchoices",
    "title": "Get Question dropdown choices.",
    "version": "1.0.0",
    "name": "GetQdC",
    "group": "Question_dropdown_choices",
    "description": "<p>Returns a list of all question dropdown choices.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "None",
            "optional": false,
            "field": "-",
            "description": "<p>No parameters required.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/questiondropdownchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n     {\n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some string\",\n\t\t   Cond       : \"some string\",\n\t\t   Textbox    : \"some text\"\n     },\n\t\t ....\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_dropdown_choices.js",
    "groupTitle": "Question_dropdown_choices"
  },
  {
    "type": "post",
    "url": "/api/questiondropdownchoices",
    "title": "Adds Question dropdown choices.",
    "version": "1.0.0",
    "name": "GetQdCadd",
    "group": "Question_dropdown_choices",
    "description": "<p>Adds a new question dropdown choices to the database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>The id of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Chooices",
            "description": "<p>The chooices of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Cond",
            "description": "<p>The Cond of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Textbox",
            "description": "<p>The information about the question.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X post http://localhost:3001/api/questiondropdownchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Cond       : \"some string\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_dropdown_choices.js",
    "groupTitle": "Question_dropdown_choices"
  },
  {
    "type": "delete",
    "url": "/api/questiondropdownchoices/:id",
    "title": "Delete Question dropdown choices.",
    "version": "1.0.0",
    "name": "GetQdCdel",
    "group": "Question_dropdown_choices",
    "description": "<p>Updates the question dropdown choices</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of choice</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X delete http://localhost:3001/api/questiondropdownchoices/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n \t \"Deleted question dropdown choice successfully\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_dropdown_choices.js",
    "groupTitle": "Question_dropdown_choices"
  },
  {
    "type": "get",
    "url": "/api/questiondropdownchoices/:id",
    "title": "Get Question dropdown choices by id.",
    "version": "1.0.0",
    "name": "GetQdCid",
    "group": "Question_dropdown_choices",
    "description": "<p>Returns the info of a question dropdown choices with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of question dropdown choices.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/questiondropdownchoices/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Cond       : \"some string\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_dropdown_choices.js",
    "groupTitle": "Question_dropdown_choices"
  },
  {
    "type": "put",
    "url": "/api/questiondropdownchoices",
    "title": "Update Question dropdown choices.",
    "version": "1.0.0",
    "name": "GetQdCupdate",
    "group": "Question_dropdown_choices",
    "description": "<p>Updates the question dropdown choices</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of choice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>The id of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Chooices",
            "description": "<p>The chooices of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Cond",
            "description": "<p>The Cond of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Textbox",
            "description": "<p>The information about the question.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X put http://localhost:3001/api/questiondropdownchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Cond       : \"some string\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_dropdown_choices.js",
    "groupTitle": "Question_dropdown_choices"
  },
  {
    "type": "get",
    "url": "/api/questionradioboxchoices",
    "title": "Get Question radio choices.",
    "version": "1.0.0",
    "name": "GetQrC",
    "group": "Question_radio_choices",
    "description": "<p>Returns a list of all question radio choices.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "None",
            "optional": false,
            "field": "-",
            "description": "<p>No parameters required.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/questionradioboxchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n     {\n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Textbox    : \"some text\"\n     },\n\t\t ....\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_radio_choices.js",
    "groupTitle": "Question_radio_choices"
  },
  {
    "type": "post",
    "url": "/api/questionradioboxchoices",
    "title": "Adds Question radio choices.",
    "version": "1.0.0",
    "name": "GetQrCadd",
    "group": "Question_radio_choices",
    "description": "<p>Adds a new question radio choices to the database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>The id of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Chooices",
            "description": "<p>The chooices of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Textbox",
            "description": "<p>The information about the question.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X post http://localhost:3001/api/questionradioboxchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_radio_choices.js",
    "groupTitle": "Question_radio_choices"
  },
  {
    "type": "delete",
    "url": "/api/questionradioboxchoices/:id",
    "title": "Delete Question radio choices.",
    "version": "1.0.0",
    "name": "GetQrCdel",
    "group": "Question_radio_choices",
    "description": "<p>Updates the question radio choices</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of choice</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X delete http://localhost:3001/api/questionradioboxchoices/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n \t \"Deleted question radio choice successfully\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_radio_choices.js",
    "groupTitle": "Question_radio_choices"
  },
  {
    "type": "get",
    "url": "/api/questionradioboxchoices/:id",
    "title": "Get Question radio choices by id.",
    "version": "1.0.0",
    "name": "GetQrCid",
    "group": "Question_radio_choices",
    "description": "<p>Returns the info of a question radio choices with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of question radio choices.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/questionradioboxchoices/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_radio_choices.js",
    "groupTitle": "Question_radio_choices"
  },
  {
    "type": "put",
    "url": "/api/questionradioboxchoices",
    "title": "Update Question radio choices.",
    "version": "1.0.0",
    "name": "GetQrCupdate",
    "group": "Question_radio_choices",
    "description": "<p>Updates the question radio choices</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of choice</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>The id of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Chooices",
            "description": "<p>The chooices of question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Textbox",
            "description": "<p>The information about the question.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X put http://localhost:3001/api/questionradioboxchoices",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t   { \n\t\t   Id \t\t  : 1,\n\t\t   QuestionID : 1,\n\t\t   Chooices   : \"some strings\",\n\t\t   Textbox    : \"some text\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/question_radio_choices.js",
    "groupTitle": "Question_radio_choices"
  },
  {
    "type": "get",
    "url": "/api/ramesinfo",
    "title": "Get rames category.",
    "version": "1.0.0",
    "name": "Getri",
    "group": "Rames_Info",
    "description": "<p>Returns a list of all information.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "None",
            "optional": false,
            "field": "-",
            "description": "<p>No parameters required.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramesinfo",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n {\n   ID                  : 1,\n   Name                : \"some name\",\n   Info                : \"some info\"\n   QuestionExplanation : \"some explanation on the question\",\n   languageID          : 1,\n   CategoryID          : 1\n },\n....\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_infos.js",
    "groupTitle": "Rames_Info"
  },
  {
    "type": "post",
    "url": "/api/ramesinfo",
    "title": "Adds a new information.",
    "version": "1.0.0",
    "name": "Getriadd",
    "group": "Rames_Info",
    "description": "<p>Adds a new information to the database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The name of the information.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "QuestionExplanation",
            "description": "<p>The explanation of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Info",
            "description": "<p>The information.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "languageId",
            "description": "<p>The id of the language.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>The id of the category.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X post http://localhost:3001/api/ramesinfo",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n   ID                  : 1,\n   Name                : \"some name\",\n   Info                : \"some info\"\n   QuestionExplanation : \"some explanation on the question\",\n   languageID          : 1,\n   CategoryID          : 1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_infos.js",
    "groupTitle": "Rames_Info"
  },
  {
    "type": "get",
    "url": "/api/ramesinfo/:id",
    "title": "Get rames category by id.",
    "version": "1.0.0",
    "name": "Getribid",
    "group": "Rames_Info",
    "description": "<p>Returns the info with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the information.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramesinfo/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   ID                  : 1,\n   Name                : \"some name\",\n   Info                : \"some info\"\n   QuestionExplanation : \"some explanation on the question\",\n   languageID          : 1,\n   CategoryID          : 1\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_infos.js",
    "groupTitle": "Rames_Info"
  },
  {
    "type": "get",
    "url": "/api/ramesinfo/language/:languageId",
    "title": "Get rames info language by language id.",
    "version": "1.0.0",
    "name": "Getridsbdlid",
    "group": "Rames_Info",
    "description": "<p>Returns the language information with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "languageId",
            "description": "<p>The id of the language.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramesinfo/language/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   ID                  : 1,\n   Name                : \"some name\",\n   Info                : \"some info\"\n   QuestionExplanation : \"some explanation on the question\",\n   languageID          : 1,\n   CategoryID          : 1\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_infos.js",
    "groupTitle": "Rames_Info"
  },
  {
    "type": "get",
    "url": "/api/ramesinfo/:id",
    "title": "Get rames info by category id.",
    "version": "1.0.0",
    "name": "Getridsbid",
    "group": "Rames_Info",
    "description": "<p>Returns the category with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>The id of the category.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramesinfo/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   ID                  : 1,\n   Name                : \"some name\",\n   Info                : \"some info\"\n   QuestionExplanation : \"some explanation on the question\",\n   languageID          : 1,\n   CategoryID          : 1\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_infos.js",
    "groupTitle": "Rames_Info"
  },
  {
    "type": "put",
    "url": "/api/ramesinfo",
    "title": "Update the information.",
    "version": "1.0.0",
    "name": "Getriupdate",
    "group": "Rames_Info",
    "description": "<p>Updates the information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>The id of the information.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The name of the information.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "QuestionExplanation",
            "description": "<p>The explanation of the question.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Info",
            "description": "<p>The information.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "languageId",
            "description": "<p>The id of the language.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>The id of the category.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X put http://localhost:3001/api/ramesinfo",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n   ID                  : 1,\n   Name                : \"some name\",\n   Info                : \"some info\"\n   QuestionExplanation : \"some explanation on the question\",\n   languageID          : 1,\n   CategoryID          : 1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_infos.js",
    "groupTitle": "Rames_Info"
  },
  {
    "type": "delete",
    "url": "/api/ramesinfo/:id",
    "title": "Deletes the information.",
    "version": "1.0.0",
    "name": "delridel",
    "group": "Rames_Info",
    "description": "<p>Deletes the information with the given id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of information</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X delete http://localhost:3001/api/ramesinfo/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n\"Deleted ramesinfo successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_infos.js",
    "groupTitle": "Rames_Info"
  },
  {
    "type": "post",
    "url": "/api/ramescategory",
    "title": "Adds a new category.",
    "version": "1.0.0",
    "name": "GetrCadd",
    "group": "Rames_category",
    "description": "<p>Adds a new category to the database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>The name of the category.</p>"
          },
          {
            "group": "Parameter",
            "type": "Text",
            "optional": false,
            "field": "info",
            "description": "<p>The information on category.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "languageID",
            "description": "<p>The id of the language.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sequenceNumber",
            "description": "<p>The sequence number of the category.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X post http://localhost:3001/api/ramescategory",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n   ID            : 1,\n   category      : \"some text\",\n   info          : \"some text\",\n   languageID    : 1,\n   sequenceNumber: 1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_categories.js",
    "groupTitle": "Rames_category"
  },
  {
    "type": "put",
    "url": "/api/ramescategory",
    "title": "Update the category.",
    "version": "1.0.0",
    "name": "GetrCupdate",
    "group": "Rames_category",
    "description": "<p>Updates the category</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of category</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>The name of the category.</p>"
          },
          {
            "group": "Parameter",
            "type": "Text",
            "optional": false,
            "field": "info",
            "description": "<p>The information on category.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "languageID",
            "description": "<p>The id of the language.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sequenceNumber",
            "description": "<p>The sequence number of the category.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X put http://localhost:3001/api/ramescategory",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n   ID            : 1,\n   category      : \"some text\",\n   info          : \"some text\",\n   languageID    : 1,\n   sequenceNumber: 1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_categories.js",
    "groupTitle": "Rames_category"
  },
  {
    "type": "get",
    "url": "/api/ramescategory",
    "title": "Get rames category.",
    "version": "1.0.0",
    "name": "Getrc",
    "group": "Rames_category",
    "description": "<p>Returns a list of all categories.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "None",
            "optional": false,
            "field": "-",
            "description": "<p>No parameters required.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramescategory",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n {\n   ID            : 1,\n   category      : \"some text\",\n   info          : \"some text\",\n   languageID    : 1,\n   sequenceNumber: 1\n },\n....\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_categories.js",
    "groupTitle": "Rames_category"
  },
  {
    "type": "get",
    "url": "/api/ramescategory/:id",
    "title": "Get rames category by id.",
    "version": "1.0.0",
    "name": "Getrcbid",
    "group": "Rames_category",
    "description": "<p>Returns the category with the given id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the category.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramescategory/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   ID            : 1,\n   category      : \"some text\",\n   info          : \"some text\",\n   languageID    : 1,\n   sequenceNumber: 1\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_categories.js",
    "groupTitle": "Rames_category"
  },
  {
    "type": "get",
    "url": "/api/ramescategory/language/:languageid",
    "title": "Get rames category by languageid.",
    "version": "1.0.0",
    "name": "Getrcblid",
    "group": "Rames_category",
    "description": "<p>Returns categories with given language.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "languageid",
            "description": "<p>The id of the language.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramescategory/language/:languageid",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   ID            : 1,\n   category      : \"some text\",\n   info          : \"some text\",\n   languageID    : 1,\n   sequenceNumber: 1\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_categories.js",
    "groupTitle": "Rames_category"
  },
  {
    "type": "get",
    "url": "/api/ramescategory/:id/language/:languageid",
    "title": "Get rames category by languageid and category id.",
    "version": "1.0.0",
    "name": "Getrcblidandid",
    "group": "Rames_category",
    "description": "<p>Returns  categories with given languageid and categoryid.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the category.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "languageid",
            "description": "<p>The id of the language.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramescategory/1/language/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   ID            : 1,\n   category      : \"some text\",\n   info          : \"some text\",\n   languageID    : 1,\n   sequenceNumber: 1\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_categories.js",
    "groupTitle": "Rames_category"
  },
  {
    "type": "get",
    "url": "/api/ramescategory/ordered/sequenceNumber",
    "title": "Get rames category order by sequencenumber",
    "version": "1.0.0",
    "name": "Getrcordersn",
    "group": "Rames_category",
    "description": "<p>Returns the category sequencenumber sorted asc.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "None",
            "optional": false,
            "field": "-",
            "description": "<p>No parameters required.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X get http://localhost:3001/api/ramescategory/ordered/sequenceNumber",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   ID            : 1,\n   category      : \"some text\",\n   info          : \"some text\",\n   languageID    : 1,\n   sequenceNumber: 1\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_categories.js",
    "groupTitle": "Rames_category"
  },
  {
    "type": "delete",
    "url": "/api/ramescategory/:id",
    "title": "Deletes the category.",
    "version": "1.0.0",
    "name": "delrCdel",
    "group": "Rames_category",
    "description": "<p>Deletes the category with the given id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>The id of category</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "None"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X delete http://localhost:3001/api/ramescategory/1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ \n\"Deleted question radio choice successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/rames_categories.js",
    "groupTitle": "Rames_category"
  }
] });
