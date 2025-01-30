const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const units = ['gal', 'mi', 'lbs', 'kg', 'km', 'l'];
const longUnits = ['gallons', 'miles', 'pounds', 'kilograms', 'kilometers', 'liters']
const nums = [1, 10, 2.0, 0.9999, 0.001, '1/2', '1.0/2', '1/4.0', '9.3/3.1'];

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input', function() {
    units.forEach(u => {
      ['2', '20', '200', '2000'].forEach(n => {
        assert.equal(convertHandler.getNum(n + u), +n);
        assert.equal(convertHandler.getNum(n + u.toUpperCase()), +n);
      });
    });
  });
  test('convertHandler should correctly read a decimal number input', function() {
    units.forEach(u => {
      ['2.0', '0.9999', '0.001', '1.00000001', '2000.25'].forEach(n => {
        assert.equal(convertHandler.getNum(n + u), +n);
        assert.equal(convertHandler.getNum(n + u.toUpperCase()), +n);
      });
    });
  });
  test('convertHandler should correctly read a fractional input', function() {
    units.forEach(u => {
      [['1/2', 0.5], ['1/4', 0.25], ['9/3', 3], ['100/10', 10]].forEach(n => {
        assert.equal(convertHandler.getNum(n[0] + u), n[1]);
        assert.equal(convertHandler.getNum(n[0].toUpperCase() + u), n[1]);
      });
    });
  });
  test('convertHandler should correctly read a fractional input with a decimal', function() {
    units.forEach(u => {
      [['1.0/2', 0.5], ['1/4.0', 0.25], ['9.3/3.1', 3], ['100.1/10.01', 10]].forEach(n => {
        assert.equal(convertHandler.getNum(n[0] + u), n[1]);
        assert.equal(convertHandler.getNum(n[0].toUpperCase() + u), n[1]);
      });
    });
  });
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
    assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid number');
    assert.equal(convertHandler.getNum('3/2/3MI'), 'invalid number');
    assert.equal(convertHandler.getNum('1/2/4L'), 'invalid number');
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    units.forEach(u => {
      assert.equal(convertHandler.getNum(u), 1);
      assert.equal(convertHandler.getNum(u.toUpperCase()), 1);
    });
  });
  test('convertHandler should correctly read each valid input unit', function() {
    nums.forEach(n => {
      units.forEach(u => {
        if (u === 'l') {
          assert.equal(convertHandler.getUnit(n + u), 'L');
          assert.equal(convertHandler.getUnit(n + u.toUpperCase()), 'L');
        } else {
          assert.equal(convertHandler.getUnit(n + u), u);
          assert.equal(convertHandler.getUnit(n + u.toUpperCase()), u);
        }
      });
    });
  });
  test('convertHandler should correctly return an error for an invalid input unit', function() {
    nums.forEach(n => {
      ['n', 'testunit', ' ', '*', 'm', 'mil', 'kgm', 'kmg', 'ml', 'gk', ''].forEach(u => {
        assert.equal(convertHandler.getUnit(n + u), 'invalid unit');
        assert.equal(convertHandler.getUnit(n + u.toUpperCase()), 'invalid unit');
      });
    });
  });
  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const reverseUnits = units.slice().reverse();
    const combinations = units.map((u, i) => [units[i], reverseUnits[i]]);
    combinations.forEach(([u1, u2]) => {
      if (u1 === 'gal') {
        assert.equal(convertHandler.getReturnUnit(u1), 'L');
        assert.equal(convertHandler.getReturnUnit(u1.toUpperCase()), 'L');
      } else {
        assert.equal(convertHandler.getReturnUnit(u1), u2);
        assert.equal(convertHandler.getReturnUnit(u1.toUpperCase()), u2);
      }
    });
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const combinations = units.map((u, i) => [units[i], longUnits[i]]);
    combinations.forEach(([u, lu]) => {
      assert.equal(convertHandler.spellOutUnit(u), lu);
      assert.equal(convertHandler.spellOutUnit(u.toLocaleUpperCase()), lu);
    });
  });
  test('convertHandler should correctly convert gal to L', function() {
    const results = [galToL, 0.1 * galToL, 1.1 * galToL, 3 * galToL, 10 * galToL, 3.15 * galToL];
    const inputs = [1, 0.1, 1.1, 3, 10, 3.15];
    inputs.forEach((input, i) => {
      const returnNum = +parseFloat(results[i]).toFixed(5)
      assert.deepEqual(convertHandler.convert(input, 'gal'), {
        initNum: input,
        initUnit: 'gal',
        returnNum,
        returnUnit: 'L',
        string: `${input} gallons converts to ${+returnNum} liters`
      });
    });
  });
  test('convertHandler should correctly convert L to gal', function() {
    const results = [1 / galToL, 0.1 / galToL, 1.1 / galToL, 3 / galToL, 10 / galToL, 3.15 / galToL];
    const inputs = [1, 0.1, 1.1, 3, 10, 3.15];
    inputs.forEach((input, i) => {
      const returnNum = +parseFloat(results[i]).toFixed(5)

      assert.deepEqual(convertHandler.convert(input, 'L'), {
        initNum: input,
        initUnit: 'L',
        returnNum,
        returnUnit: 'gal',
        string: `${input} liters converts to ${+returnNum} gallons`
      });
    });
  });
  test('convertHandler should correctly convert mi to km', function() {
    const results = [miToKm, 0.1 * miToKm, 1.1 * miToKm, 3 * miToKm, 10 * miToKm, 3.15 * miToKm];
    const inputs = [1, 0.1, 1.1, 3, 10, 3.15];
    inputs.forEach((input, i) => {
      const returnNum = +parseFloat(results[i]).toFixed(5)

      assert.deepEqual(convertHandler.convert(input, 'mi'), {
        initNum: input,
        initUnit: 'mi',
        returnNum,
        returnUnit: 'km',
        string: `${input} miles converts to ${+returnNum} kilometers`
      });
    });
  });
  test('convertHandler should correctly convert km to mi', function() {
    const results = [1 / miToKm, 0.1 / miToKm, 1.1 / miToKm, 3 / miToKm, 10 / miToKm, 3.15 / miToKm];
    const inputs = [1, 0.1, 1.1, 3, 10, 3.15];
    inputs.forEach((input, i) => {
      const returnNum = +parseFloat(results[i]).toFixed(5)

      assert.deepEqual(convertHandler.convert(input, 'km'), {
        initNum: input,
        initUnit: 'km',
        returnNum,
        returnUnit: 'mi',
        string: `${input} kilometers converts to ${+returnNum} miles`
      });
    });
  });
  test('convertHandler should correctly convert lbs to kg', function() {
    const results = [lbsToKg, 0.1 * lbsToKg, 1.1 * lbsToKg, 3 * lbsToKg, 10 * lbsToKg, 3.15 * lbsToKg];
    const inputs = [1, 0.1, 1.1, 3, 10, 3.15];
    inputs.forEach((input, i) => {
      const returnNum = +parseFloat(results[i]).toFixed(5)

      assert.deepEqual(convertHandler.convert(input, 'lbs'), {
        initNum: input,
        initUnit: 'lbs',
        returnNum,
        returnUnit: 'kg',
        string: `${input} pounds converts to ${+returnNum} kilograms`
      });
    });
  });
  test('convertHandler should correctly convert kg to lbs', function() {
    const results = [1 / lbsToKg, 0.1 / lbsToKg, 1.1 / lbsToKg, 3 / lbsToKg, 10 / lbsToKg, 3.15 / lbsToKg];
    const inputs = [1, 0.1, 1.1, 3, 10, 3.15];
    inputs.forEach((input, i) => {
      const returnNum = +parseFloat(results[i]).toFixed(5)

      assert.deepEqual(convertHandler.convert(input, 'kg'), {
        initNum: input,
        initUnit: 'kg',
        returnNum,
        returnUnit: 'lbs',
        string: `${input} kilograms converts to ${+returnNum} pounds`
      });
    });
  });
});
