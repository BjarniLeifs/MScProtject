## Config
The config folder contains all configuration that is needed for the project. 

### configuration.js

Here you can change the secret_key for the json web tokens, username for the database, password, links for the host, ports and name of the database. the function does not need to be updated, only the constants e.g. db_local_username if changed. then only change those things to the once you work with. 

### mailOptions.js

The Mail options is not used in the projected as if, but you can implement them easy to be used when ever, for most parts you will use them for changing password, confirming e-mail and so on. This configuration is for the smtp host, ports the username of the email and password. 

### server.js

The same logic applies here as for the configuration.js, here we can change the host and port of the project. only change constants like main_port and so on. 
