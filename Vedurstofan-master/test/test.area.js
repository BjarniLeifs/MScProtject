var request = require('supertest');
var utilTest = require('../test/utils');


describe('Checking Area API', function () {
  var server;
  var adminToken;
  var userToken;

  beforeEach(function () {
    server = require('../server');
    adminToken = utilTest.getAdminToken();
    userToken = utilTest.getUserToken();
    
  });
  
  it('Should get all area ', function testGetAllArea (done) {
    request(server)
      .get('/api/getArea')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get area by id ', function testGetAntennaById (done) {
    request(server)
      .get('/api/getAreaById/1')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get area by area ', function testGetAllFilterAntenna (done) {
    request(server)
      .get('/api/getAreaByArea/Norðurland')
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