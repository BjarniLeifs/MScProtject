var request = require('supertest');
var utilTest = require('../test/utils');


describe('Checking Attribute API', function () {
  var server;
  var adminToken;
  var userToken;

  beforeEach(function () {
    server = require('../server');
    adminToken = utilTest.getAdminToken();
    userToken = utilTest.getUserToken();
    
  });
  
  it('Should get all attribute ', function testGetAllAttribute (done) {
    request(server)
      .get('/api/getAllAttributes')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get all attribute type ', function testGetAllAttributeType (done) {
    request(server)
      .get('/api/getAllTypeAttribute')
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