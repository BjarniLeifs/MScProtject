# Folderstucture

```
.
|
|-- bin				
|    -- www 						* Create of server and other things related to it. 
|
|-- config 							* Configuration for all things within this project. 
|
|-- DTO 							* Data Transfer Objects from Database and API defined to sent to user. 
|
|-- library 						* Helper functions and other related things that can be used in the project are defined here. Such as the main functinality of the authentication is here. 
|
|-- models 							* Models that comunicate with the database is defined in this folder. This is used for encapsulation. 
|
|-- node_modules					* node installed dependancy for the project. ( npm install )
| 									
|--	public 							* FRONT END OF THE PROJECT IS ALL HERE. 
|   |
|   |   
|   |-- stylesheets
|   |
|   |-- image						* Holds each image needed on the web..
|   |
|	|-- javascript  				* Angular applications		
|	|	   |-- controllers						
|	|	   |-- services
|	|		-- angularApp.js
|   |   
|	|-- main						* Files from views folder below, see Gruntfile.js concat 
|	|		|-- *.js 							* Concated file from views
|	|		 -- *.css							* Concated file from views
|   |
|   |-- stylesheets 				* Files that contains css files	
|   |     
|	|--	views 						* Main view folder for angular, app route and each component. 
|       | 							* All the controllers, factory, html and css for each webpage.
|		| 	 -- *foldername  		* Name of page in the project. e.q. frontpage.
|		|		|-- *Controller.js  * Logic for each part, gets concated to main.js
|		|		|-- *Factory.js 	* Bridge between from controller to API, gets concated to main.js 
|		|		|-- *.html 			* Html code for the component part
|		|		 -- *.css 			* Same as others, gets concated to main.css
|       |
|	    |--	error.html 				
|	     -- index.html 				* Master layout for the web, angular get injected here, navbar is here also
|
|-- Readings 						* Reading material for the project should be in here. 
|	
|-- routes							* BACK END OF THE PROJECT IS ALL HERE
|
|-- sql								* All SQL things, tables scheme, data and so on is here. 
|
|-- Temp 							* Content that can be deleted or used later. 
|
|-- test							* Test code is written in this folder. 
|
|-- app.js 							* Here we have configure of the server, what to use and more
|
|-- *
|       Other files are used for e.g. grunt, npm "package.json" and other .md files
*
```
