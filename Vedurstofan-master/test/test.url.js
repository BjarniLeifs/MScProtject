var request = require('supertest');
var utilTest = require('../test/utils');


describe('Loading express', function () {
  var server;
  var adminToken;
  var userToken;

  beforeEach(function () {
    server = require('../server');
    adminToken = utilTest.getAdminToken();
    userToken = utilTest.getUserToken();
    
  });
  
  it('Responds to url /', function testSlash (done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  
  it('404 everything else', function testPath (done) {
    request(server)
      .get('/unknown')
      .expect(404, done);
  });

  
});