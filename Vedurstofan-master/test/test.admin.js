var request = require('supertest');
var utilTest = require('../test/utils');


describe('Checking Administration API', function () {
  var server;
  var adminToken;
  var userToken;

  beforeEach(function () {
    server = require('../server');
    adminToken = utilTest.getAdminToken();
    userToken = utilTest.getUserToken();
    
  });
  
  it('Change user password ', function testAdminChangePassword (done) {
    var user = {
      'username' : 'admin', 
      'password' : 'admin'
    };

    request(server)
      .put('/api/adminChangeUserPassword')
      .send(user)
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