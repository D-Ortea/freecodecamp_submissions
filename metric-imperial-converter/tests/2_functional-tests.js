const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const galToL = 3.78541;
const lbsToKg = 0.453592;

suite('Functional Tests', function() {
  test('Convert a valid input such as 10L: GET request to /api/convert.', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=10L')
      .end(function(_err, res) {
        const returnNum = +parseFloat(10 / galToL).toFixed(5);
        assert.equal(res.status, 200);
        assert.deepEqual({ initNum: 10, initUnit: 'L', returnNum, returnUnit: 'gal', string: `10 liters converts to ${returnNum} gallons` }, res.body);
        done();
      });
  });
  test('Convert an invalid input such as 32g: GET request to /api/convert.', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=32g')
      .end(function(_err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(_err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(_err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });
  test('Convert with no number such as kg: GET request to /api/convert.', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=kg')
      .end(function(_err, res) {
        const returnNum = +parseFloat(1 / lbsToKg).toFixed(5);
        assert.equal(res.status, 200);
        assert.deepEqual({ initNum: 1, initUnit: 'kg', returnNum, returnUnit: 'lbs', string: `1 kilograms converts to ${returnNum} pounds` }, res.body);
        done();
      });
  });
});
