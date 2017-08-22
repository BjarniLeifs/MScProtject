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

  it('Should get all contacts ', function testGetAllContacts (done) {
    request(server)
      .get('/api/getAllContacts')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });
/*


 it('Should get contact by id ', function testGetContactById(done) {
    request(server)
      .get('/api/getContactById/1')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });
  it('Should get contact by name ', function testGetContactByName(done) {
    request(server)
      .get('/api/getContactById/1')
      .set('Authorization', 'Bearer ' + adminToken )
      .expect(200)
      .end(function (err, ress) {
        if (err) {
          done(err);
        } 
      });
      done();
  });
*/

});