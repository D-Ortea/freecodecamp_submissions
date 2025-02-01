'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', function(req, res) {
    try {
      const input = req.query.input;
      const num = convertHandler.getNum(input);
      const unit = convertHandler.getUnit(input);

      if (num === 'invalid number' && unit === 'invalid unit') {
        return res.send('invalid number and unit');
      }

      if (num === 'invalid number') {
        return res.send(num);
      }

      if (unit === 'invalid unit') {
        return res.send(unit);
      }

      res.json(convertHandler.convert(num, unit));
    } catch (err) {
      console.log(err);
    }
  });
};

