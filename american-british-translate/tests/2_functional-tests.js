const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test("Translation with text and locale fields: POST request to /api/translate", function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-british', text: 'Mangoes are my favorite fruit.' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['error']);
        assert.hasAnyKeys(res.body, ['text']);
        assert.hasAnyKeys(res.body, ['translation']);
        assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
        assert.equal(res.body.translation, `Mangoes are my <span class="highlight">favourite</span> fruit.`);
        done();
      });
  });
  test("Translation with text and invalid locale field: POST request to /api/translate", function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'chinese-to-korean', text: 'Mangoes are my favorite fruit.' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['error']);
        assert.doesNotHaveAnyKeys(res.body, ['text']);
        assert.doesNotHaveAnyKeys(res.body, ['translation']);
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
  });
  test("Translation with missing text field: POST request to /api/translate", function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-british' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['error']);
        assert.doesNotHaveAnyKeys(res.body, ['text']);
        assert.doesNotHaveAnyKeys(res.body, ['translation']);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });
  test("Translation with missing locale field: POST request to /api/translate", function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ text: 'Test sentence.' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['error']);
        assert.doesNotHaveAnyKeys(res.body, ['text']);
        assert.doesNotHaveAnyKeys(res.body, ['translation']);
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
  });
  test("Translation with empty text: POST request to /api/translate", function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-british', text: '' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.hasAnyKeys(res.body, ['error']);
        assert.doesNotHaveAnyKeys(res.body, ['text']);
        assert.doesNotHaveAnyKeys(res.body, ['translation']);
        assert.equal(res.body.error, 'No text to translate');
        done();
      });
  });
  test("Translation with text that needs no translation: POST request to /api/translate", function(done) {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-british', text: 'Mangoes are my favourite fruit.' })
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.doesNotHaveAnyKeys(res.body, ['error']);
        assert.hasAnyKeys(res.body, ['text']);
        assert.hasAnyKeys(res.body, ['translation']);
        assert.equal(res.body.text, 'Mangoes are my favourite fruit.');
        assert.equal(res.body.translation, 'Everything looks good to me!');
        done();
      });
  });
});
