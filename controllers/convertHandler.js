'use strict';

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.split(/[a-z]/i);
    
    // if no number input is provided default to 1
    if(result[0] === '') return 1;
    
    // if double fraction is used
    let arr = input.split("").filter(e => e === '/');
    if(arr.length > 1) return 'invalid number';
    
    return parseFloat(eval(result[0]).toFixed(5));
  };
  
  this.getUnit = function(input) {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
    const result = input.match(/[a-z]+$/i);
    
    // if no unit input is provided or unit input is unknown 
    if(result[0] === '' || !units.includes(result[0])) return 'invalid unit';
    
    return result[0];
  };
  
  this.getReturnUnit = function(initUnit) {
    if(initUnit === 'invalid unit') return 'invalid unit';
    const units = {
      kg: 'lbs',
      lbs: 'kg',
      mi: 'km',
      km: 'mi',
      gal: 'l',
      l: 'gal'
    };
    
    return units[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const units = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return units[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    if(initNum === 'invalid number' || initUnit === 'invalid unit') return 'invalid number';
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const lookup = {
      gal: galToL,
      l: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg
    };
    
    return parseFloat((initNum * lookup[initUnit.toLowerCase()]).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let spelledOutInitUnits = this.spellOutUnit(initUnit);
    spelledOutInitUnits = initNum === 1 ? spelledOutInitUnits.slice(0, -1) : spelledOutInitUnits;
    let spelledOutReturnUnits = this.spellOutUnit(returnUnit);
    spelledOutReturnUnits = returnNum === 1 ? spelledOutReturnUnits.slice(0, -1) : spelledOutReturnUnits;
    return `${initNum} ${spelledOutInitUnits} converts to ${returnNum} ${spelledOutReturnUnits}`;
  };
}

module.exports = ConvertHandler;