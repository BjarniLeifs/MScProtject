var request = require('supertest');
var should = require('should');
var asser = require('assert');
var utilTest = require('../test/utils');
var userHelper = require('../server/helpers/users');


describe('Checking Helpers in API', function () {


  beforeEach(function () {
    server = require('../server');
  });


  it('Should encrypt password and check if it is valid, return true', function testEncryptionTrue () {
    var userObject = {
      'username' : 'tester', 
      'password' : 'tester'
    };
    var encryptedPassword = userHelper.setPassword(userObject.password);
    var validObject = userHelper.validPassword(userObject.password, encryptedPassword);
    validObject.should.equal(true);

  });

  it('Should test if password is vallid, return false', function testFalsePassword () {
    var userObject = {
      'username' : 'tester', 
      'password' : 'tester'
    };
    var encryptedPassword = userHelper.setPassword(userObject.password);
    var validObject = userHelper.validPassword('wrongPassword', encryptedPassword);
    validObject.should.equal(false);

  });

  
});