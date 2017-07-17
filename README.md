# rames

## Getting started.

First we need to have node installed, you can find it here -> https://nodejs.org/en/

After installed node we need to install grunt and grunt-cli. 

Type in console 
* npm install grunt -g
* npm install grunt-cli -g

After installed the grunt and it's cli we need to install apidocjs

Type in console
* npm install apidoc -g

By now we should be done with dependancies and should be in the root directory. Now we need to 
install the project dependancies.

Type in cosole
* npm install

When npm install has finished we need to type in console 
* grunt

Now the project should be up and running. 

## Structure of code.

The routes are intented for the api calls, such as they act as controllers, the models are SQL based logic's that service the controllers. Then we have the library, they do not depend on any of them but surve them as they need. 

We want to keep the structure this way such as if we need to build our own code that we want to re-use and has less value in controller or in models we make library file and build it up. 

:)