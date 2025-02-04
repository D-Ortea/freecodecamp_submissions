/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const { before, beforeEach, after, afterEach } = require('mocha')
const { Book } = require('../db/db');
const mongoose = require('mongoose');

const books = [
  { title: "Test book1", comments: ["Test comment 1"], commentcount: 1 },
  { title: "Test book2", comments: [], commentcount: 0 },
];

const titleRegex = /^Test book\d+$/;

suite('Functional Tests', function() {
  before(async function() {
    mongoose.connect(process.env.MONGO_URI);
  });

  beforeEach(async function() {
    await Book.insertMany(books);
  });

  afterEach(async function() {
    await Book.deleteMany({ title: { $regex: titleRegex } });
  });

  after(async function() {
    mongoose.disconnect();
  });

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done) {
    chai.request(server)
      .get('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */
  suite('Routing tests', function() {

    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
        const book = { title: 'Test title' };
        chai.request(server)
          .post('/api/books')
          .send(book)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, '_id', 'Book object should contain _id');
            assert.property(res.body, 'title', 'Book object should contain title');
            assert.equal(res.body.title, book.title);
            done();
          });
      });

      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.text);
            assert.equal(res.text, 'missing required field title');
            done();
          });
      });

    });


    suite('GET /api/books => array of books', function() {

      test('Test GET /api/books', function(done) {
        chai.request(server)
          .get('/api/books')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'comments', 'Books in array should contain comments');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');

            for (let i = 0; i < res.body.length; i++) {
              if (res.body[i].title.match(titleRegex)) {
                const book = books.find(b => b.title === res.body[i].title);
                assert.isDefined(book);
                assert.isArray(res.body[i].comments);
                assert.deepEqual(res.body[i].comments, book.comments);
                assert.equal(res.body[i].commentcount, book.commentcount);
              }
            }

            done();
          });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', function() {

      test('Test GET /api/books/[id] with id not in db', function(done) {
        chai.request(server)
          .get('/api/books/1')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.text);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function(done) {
        Book.findOne({ title: books[0].title })
          .exec()
          .then((book) => {
            assert.isDefined(book);
            chai.request(server)
              .get(`/api/books/${book._id}`)
              .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'response should be an object');
                assert.property(res.body, 'commentcount', 'Book object should contain commentcount');
                assert.property(res.body, 'title', 'Book object should contain title');
                assert.property(res.body, '_id', 'Book object should contain _id');
                assert.isArray(res.body.comments);
                assert.deepEqual(res.body.comments, book.comments);
                assert.equal(res.body.commentcount, book.commentcount);
                done();
              });
          })
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function() {

      test('Test POST /api/books/[id] with comment', function(done) {
        const body = { comment: 'Test comment' };
        Book.findOne({ title: books[1].title })
          .exec()
          .then((book) => {
            assert.equal(book.commentcount, 0);

            chai.request(server)
              .post(`/api/books/${book._id}`)
              .send(body)
              .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'response should be an object');
                assert.property(res.body, 'commentcount', 'Book object should contain commentcount');
                assert.property(res.body, 'title', 'Book object should contain title');
                assert.property(res.body, '_id', 'Book object should contain _id');
                assert.property(res.body, 'comments', 'Book object should contain comments');
                assert.isArray(res.body.comments);
                assert.deepEqual(res.body.comments, [body.comment]);
                assert.equal(res.body.commentcount, book.commentcount + 1);
                done();
              });
          })

      });

      test('Test POST /api/books/[id] without comment field', function(done) {
        Book.findOne({ title: books[1].title })
          .exec()
          .then((book) => {
            chai.request(server)
              .post(`/api/books/${book._id}`)
              .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isString(res.text);
                assert.equal(res.text, 'missing required field comment');
                done();
              });
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done) {
        chai.request(server)
          .post('/api/books/1')
          .send({ comment: 'Test comment' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.text);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done) {
        Book.findOne({ title: books[1].title })
          .exec()
          .then((book) => {
            chai.request(server)
              .delete(`/api/books/${book._id}`)
              .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.isString(res.text);
                assert.equal(res.text, 'delete successful');
                done();
              });
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done) {
        chai.request(server)
          .delete('/api/books/1')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.text);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

    });

  });

});
