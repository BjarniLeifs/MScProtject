var request = require('supertest');
var utilTest = require('../test/utils');


describe('Checking Users API', function () {
  var server;
  var adminToken;
  var userToken;

  beforeEach(function () {
    server = require('../server');
    adminToken = utilTest.getAdminToken();
    userToken = utilTest.getUserToken();
    
  });
  
  it('Should login user ', function testUserLogin (done) {
    var user = {
      'username' : 'admin', 
      'password' : 'admin'
    };

    request(server)
      .post('/login')
      .send(user)
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get all users ', function testGetAllUsers (done) {
    request(server)
      .get('/api/getAllUsers')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get user by id : 1 ', function testGetUserById (done) {
    request(server)
      .get('/api/getUserById/'+1)
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get user by username', function testGetUserByUsername (done) {
    request(server)
      .get('/api/getUserByUsername/admin')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get user by name', function testGetUserByName (done) {
    request(server)
      .get('/api/getUserByName/admin')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get user by company', function testGetUserByCompany (done) {
    request(server)
      .get('/api/getAllUserOfCompany/Veðurstofa Íslands')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });
});


























