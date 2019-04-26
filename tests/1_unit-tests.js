const chai = require('chai'),
      assert = chai.assert,
      ConvertHandler = require('../controllers/convertHandler.js'),
      convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  
  suite('Function convertHandler.getNum(input)', () => {
    
    test('Whole number input', done => {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', done => {
      const input = '3.85kg';
      assert.equal(convertHandler.getNum(input), 3.85);
      done();
    });
    
    test('Fractional Input', done => {
      const input = '3/2mi';
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });
    
    test('Fractional Input w/ Decimal', done => {
      const input = '4.4/2KM';
      assert.equal(convertHandler.getNum(input), 2.2);
      done();
    });
    
    test('Invalid Input (double fraction)', done => {
      const input = '3/4/2L';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });
    
    test('No Numerical Input', done => {
      const input = 'mi';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
  });
      
  suite('Function convertHandler.getUnit(input)', () => {
    
    test('For Each Valid Unit Inputs', done => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      input.forEach(e => {
        const input = 100 + e;
        assert.equal(convertHandler.getUnit(input), e);
      });
      done();
    });
    
    test('Unknown Unit Input', done => {
      const input = '500kilograms';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });  
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', () => {
    
    test('For Each Valid Unit Inputs', done => {
      const input =  ['gal', 'l',   'mi', 'km', 'lbs', 'kg'];
      const expect = ['l',   'gal', 'km', 'mi', 'kg',  'lbs'];
      input.forEach((e, i) => {
        assert.equal(convertHandler.getReturnUnit(e), expect[i]);
      });
      done();
    });
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', () => {
    
    test('For Each Valid Unit Inputs', done => {
      const input =  ['gal',     'l',      'mi',    'km',         'lbs',    'kg'];
      const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((e, i) => {
        assert.equal(convertHandler.spellOutUnit(e), expect[i]);
      });
      done();
    });
  });
  
  suite('Function convertHandler.convert(num, unit)', () => {
    //with 0.1 tolerance
    
    test('Gal to L', done => {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1); 
      done();
    });
    
    test('L to Gal', done => {
      const input = [10, 'l'];
      const expected = 2.64172;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', done => {
      const input = [200, 'mi'];
      const expected = 321.869;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', done => {
      const input = [52, 'km'];
      const expected = 32.3113;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1); 
      done();
    });
    
    test('Lbs to Kg', done => {
      const input = [145, 'lbs'];
      const expected = 65.7709;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1); 
      done();
    });
    
    test('Kg to Lbs', done => {
      const input = [136, 'kg'];
      const expected = 299.829;
      assert.approximately(convertHandler.convert(input[0],input[1]), expected, 0.1); 
      done();
    });
  });
});