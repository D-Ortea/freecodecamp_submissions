const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
    const [puzzle, solution] = puzzlesAndSolutions[0];
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['solution']);
        assert.doesNotHaveAnyKeys(res.body, ['error']);
        assert.equal(res.body.solution, solution);
        done();
      });
  });
  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle: '' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['solution']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Required field missing');
        done();
      });
  });
  test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
    const puzzle = 'A.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['solution']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });
  test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
    const len80 = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle: len80 })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['solution']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });
  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
    const puzzle = '1.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai
      .request(server)
      .keepOpen()
      .post('/api/solve')
      .send({ puzzle })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['solution']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Puzzle cannot be solved');
        done();
      });
  });
  test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A1', value: '7' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['valid']);
        assert.doesNotHaveAnyKeys(res.body, ['conflict']);
        assert.isTrue(res.body.valid);
        done();
      });
  });
  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A1', value: '6' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['valid']);
        assert.hasAnyKeys(res.body, ['conflict']);
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ["column"]);
        done();
      });
  });
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A1', value: '1' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['valid']);
        assert.hasAnyKeys(res.body, ['conflict']);
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ["row", "column"]);
        done();
      });
  });
  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A1', value: '5' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['valid']);
        assert.hasAnyKeys(res.body, ['conflict']);
        assert.isFalse(res.body.valid);
        assert.deepEqual(res.body.conflict, ["row", "column", "region"]);
        done();
      });
  });
  test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A1' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['valid']);
        assert.doesNotHaveAnyKeys(res.body, ['conflict']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });
  test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
    const puzzle = 'A.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A1', value: '1' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['valid']);
        assert.doesNotHaveAnyKeys(res.body, ['conflict']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });
  test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A1', value: '1' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['valid']);
        assert.doesNotHaveAnyKeys(res.body, ['conflict']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
    const puzzle = '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A11', value: '1' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['valid']);
        assert.doesNotHaveAnyKeys(res.body, ['conflict']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Invalid coordinate');
        done();
      });
  });
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
    const puzzle = '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
    chai
      .request(server)
      .keepOpen()
      .post('/api/check')
      .send({ puzzle, coordinate: 'A1', value: '10' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['valid']);
        assert.doesNotHaveAnyKeys(res.body, ['conflict']);
        assert.hasAnyKeys(res.body, ['error']);
        assert.equal(res.body.error, 'Invalid value');
        done();
      });
  });
});

