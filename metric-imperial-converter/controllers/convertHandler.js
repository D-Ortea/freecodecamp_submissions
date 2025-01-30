function ConvertHandler() {
  this.galToL = 3.78541;
  this.lbsToKg = 0.453592;
  this.miToKm = 1.60934;

  this.unitMap = {
    gal: { returnUnit: 'L', longUnit: 'gallons', fn: (gal) => gal * this.galToL },
    mi: { returnUnit: 'km', longUnit: 'miles', fn: (mi) => mi * this.miToKm },
    lbs: { returnUnit: 'kg', longUnit: 'pounds', fn: (lbs) => lbs * this.lbsToKg },
    l: { returnUnit: 'gal', longUnit: 'liters', fn: (l) => l / this.galToL },
    km: { returnUnit: 'mi', longUnit: 'kilometers', fn: (km) => km / this.miToKm },
    kg: { returnUnit: 'lbs', longUnit: 'kilograms', fn: (kg) => kg / this.lbsToKg }
  };
  this.longestUnit = Math.max(...Object.keys(this.unitMap).map(u => u.length));
  this.numRegex = /^((?:[1-9]\d*|0\.\d*[1-9]\d*|[1-9]\d*\.\d+)(?:\/(?:[1-9]\d*|0\.\d*[1-9]\d*|[1-9]\d*\.\d+))?)([a-z]+|$)/i;
  this.unitRegex = /(?:^|\d|\/|\.)(gal|mi|lbs|l|km|kg)$/i

  this.getNum = function(input) {
    if (!input || typeof input != 'string') { return "invalid number" };

    const numMatch = input.match(this.numRegex) || '';
    const unitMatch = input.match(this.unitRegex);

    if (unitMatch && unitMatch[1].length === input.length && numMatch.length === 0) {
      return 1;
    }

    if (numMatch.length === 0) {
      return "invalid number";
    }

    const num = numMatch[1];

    if (num.includes('/')) {
      const [n1, n2] = num.split('/');
      return +n1 / +n2;
    }

    return +num;
  };

  this.getUnit = function(input) {
    const match = input.match(this.unitRegex);
    if (!match) { return "invalid unit"; }

    let unit = match[1];

    if (unit.toLowerCase() === 'l') {
      return 'L';
    }

    return unit.toLowerCase();
  };

  this.getReturnUnit = function(initUnit) {
    return this.unitMap[initUnit.toLowerCase()].returnUnit;
  };

  this.spellOutUnit = function(unit) {
    return this.unitMap[unit.toLowerCase()].longUnit;
  };

  this.convert = function(initNum, initUnit) {
    const returnUnit = this.getReturnUnit(initUnit);
    const num = +initNum;
    const returnNum = +parseFloat(this.unitMap[initUnit.toLowerCase()].fn(num)).toFixed(5);

    return {
      initNum: num,
      initUnit,
      returnNum,
      returnUnit,
      string: this.getString(num, initUnit, returnNum, returnUnit)
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const longInitUnit = this.spellOutUnit(initUnit);
    const longReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${longInitUnit} converts to ${returnNum} ${longReturnUnit}`;
  };

}

module.exports = ConvertHandler;
