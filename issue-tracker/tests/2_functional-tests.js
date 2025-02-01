const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const { before, beforeEach, after, afterEach } = require('mocha')
const server = require('../server');
const req = require('express/lib/request');
chai.use(chaiHttp);

const mongoose = require('mongoose');
const { Project } = require('../db/db');
let projectDoc;

suite('Functional Tests', function() {
  before(async function() {
    mongoose.connect(process.env.MONGO_URI);
    projectDoc = new Project({ name: 'myTestProject', issues: [] });
    await projectDoc.save();
  });

  beforeEach(async function() {
    const issues = [
      { issue_title: 'Title1', issue_text: 'Text1', created_by: 'Joe1', status_text: 'New' },
      { issue_title: 'Title2', issue_text: 'Text2', created_by: 'Joe1', assigned_to: 'Era1', status_text: 'Assigned' },
      { issue_title: 'Title3', issue_text: 'Text3', created_by: 'Joe2', assigned_to: 'Era2', status_text: 'Ongoing' },
      { issue_title: 'Title4', issue_text: 'Text4', created_by: 'Joe2', assigned_to: 'Era1', status_text: 'Solved', open: false },
      { issue_title: 'Title5', issue_text: 'Text5', created_by: 'Joe3', assigned_to: 'Era2', status_text: 'Solved', open: false }
    ];

    projectDoc = await Project.create({ name: 'myTestProject', issues });
    await projectDoc.save();
  });

  afterEach(async function() {
    await Project.deleteMany({ name: 'myTestProject' });
  });

  after(async function() {
    await Project.deleteMany({ name: 'myTestProject' });
    mongoose.disconnect();
  });

  test('Create an issue with every field: POST request to /api/issues/{project}', function(done) {
    const issue = { issue_title: 'Title', issue_text: 'Text', created_by: 'Joe', assigned_to: 'Era', status_text: 'New' };
    chai
      .request(server)
      .keepOpen()
      .post('/api/issues/myTestProject')
      .send(issue)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.exists(res.body._id);
        assert.isString(res.body._id);
        assert.isNotEmpty(res.body._id);
        assert.equal(res.body.issue_title, issue.issue_title);
        assert.equal(res.body.issue_text, issue.issue_text);
        assert.equal(res.body.created_by, issue.created_by);
        assert.equal(res.body.assigned_to, issue.assigned_to);
        assert.isTrue(res.body.open);
        assert.equal(res.body.status_text, issue.status_text);
        done();
      });
  });
  test('Create an issue with only required fields: POST request to /api/issues/{project}', function(done) {
    const issue = { issue_title: 'Test', issue_text: 'Text', created_by: 'Joe' };
    chai
      .request(server)
      .keepOpen()
      .post('/api/issues/myTestProject')
      .send(issue)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.exists(res.body._id);
        assert.isString(res.body._id);
        assert.isNotEmpty(res.body._id);
        assert.equal(res.body.issue_title, issue.issue_title);
        assert.equal(res.body.issue_text, issue.issue_text);
        assert.equal(res.body.created_by, issue.created_by);
        assert.isEmpty(res.body.assigned_to);
        assert.isTrue(res.body.open);
        assert.isEmpty(res.body.status_text);
        done();
      });
  });
  test('Create an issue with missing required fields: POST request to /api/issues/{project}', function(done) {
    const issue = { issue_title: 'Test issue', issue_text: 'Text of issue' };
    chai
      .request(server)
      .keepOpen()
      .post('/api/issues/myTestProject')
      .send(issue)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing');
        done()
      });
  });
  test('View issues on a project: GET request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/issues/myTestProject')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 5);
        done();
      });
  });
  test('View issues on a project with one filter: GET request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/issues/myTestProject?open=false')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 2);
        done();
      });
  });
  test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/issues/myTestProject?open=false&assigned_to=Era1&created_by=Joe2')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 1);
        done();
      });
  });
  test('Update one field on an issue: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .put('/api/issues/myTestProject')
      .send({ _id: projectDoc.issues[0]._id, issue_title: 'Test PUT' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, projectDoc.issues[0]._id);
        done();
      });
  });
  test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .put('/api/issues/myTestProject')
      .send({ _id: projectDoc.issues[0]._id, issue_title: 'Test PUT', issue_text: 'Test text', assigned_to: 'Test person' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, projectDoc.issues[0]._id);
        done();
      });
  });
  test('Update an issue with missing _id: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .put('/api/issues/myTestProject')
      .send({ issue_title: 'Test PUT', issue_text: 'Test text', assigned_to: 'Test person' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'missing _id');
        done();
      });
  });
  test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .put('/api/issues/myTestProject')
      .send({ _id: projectDoc.issues[0]._id })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'no update field(s) sent');
        assert.equal(res.body._id, projectDoc.issues[0]._id);
        done();
      });
  });
  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .put('/api/issues/myTestProject')
      .send({ _id: 'bad_id', issue_title: 'Test PUT', issue_text: 'Test text', assigned_to: 'Test person' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'could not update');
        assert.equal(res.body._id, 'bad_id');
        done();
      });
  });
  test('Delete an issue: DELETE request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .delete('/api/issues/myTestProject')
      .send({ _id: projectDoc.issues[0]._id })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully deleted');
        assert.equal(res.body._id, projectDoc.issues[0]._id);
        done();
      });
  });
  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .delete('/api/issues/myTestProject')
      .send({ _id: 'bad_id' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'could not delete');
        assert.equal(res.body._id, 'bad_id');
        done();
      });
  });
  test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function(done) {
    chai
      .request(server)
      .keepOpen()
      .delete('/api/issues/myTestProject')
      .send({})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'missing _id');
        done();
      });
  });
});
