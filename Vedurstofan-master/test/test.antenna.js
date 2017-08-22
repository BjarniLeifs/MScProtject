var request = require('supertest');
var utilTest = require('../test/utils');


describe('Checking Antenna API', function () {
  var server;
  var adminToken;
  var userToken;

  beforeEach(function () {
    server = require('../server');
    adminToken = utilTest.getAdminToken();
    userToken = utilTest.getUserToken();
    
  });
  
  it('Should get all antenna ', function testGetAllAntenna (done) {
    request(server)
      .get('/api/getAllAntenna')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get antenna by name ', function testGetAntennaByName (done) {
    request(server)
      .get('/api/getAntennaByName/ALM')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });

  it('Should get all Filter antenna ', function testGetAllFilterAntenna (done) {
    request(server)
      .get('/api/getAllFilterAntenna')
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