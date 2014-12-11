var assert = require('assert');
var colour = require('../colour');

describe('colour', function() {
    describe('hexToRgb', function() {
        it('should return an object', function() {
            assert.equal(typeof colour.hexToRgb('#ffffff'), 'object');
        });

        it('should convert a hex-format colour string to an rgb object', function() {
            assert.deepEqual(colour.hexToRgb('#ffffff'), { r: 255, g: 255, b: 255 });
            assert.deepEqual(colour.hexToRgb('#000000'), { r: 0, g: 0, b: 0 });
            assert.deepEqual(colour.hexToRgb('#d90a1a'), { r: 217, g: 10, b: 26 });
        });

        it('should convert shorthand hex to rgb', function() {
            assert.deepEqual(colour.hexToRgb('#fff'), { r: 255, g: 255, b: 255 });
            assert.deepEqual(colour.hexToRgb('#000'), { r: 0, g: 0, b: 0 });
            assert.deepEqual(colour.hexToRgb('#d90'), { r: 221, g: 153, b: 0 });
        });

        it('should not require a hash', function() {
            assert.deepEqual(colour.hexToRgb('#fff'), colour.hexToRgb('fff'));
            assert.deepEqual(colour.hexToRgb('#fff'), colour.hexToRgb('ffffff'));
            assert.deepEqual(colour.hexToRgb('fff'), { r: 255, g: 255, b: 255 });
        });

        it('should return null if an unknown string is passed', function() {
            assert.equal(colour.hexToRgb('#ffff'), null);
            assert.equal(colour.hexToRgb('ffff'), null);
            assert.equal(colour.hexToRgb('ff'), null);
            assert.equal(colour.hexToRgb(0), null);
            assert.equal(colour.hexToRgb('ghg'), null);
            assert.equal(colour.hexToRgb('chucknorris'), null);
        });
    });

    describe('rgbToHex', function() {
        it('should return a string', function() {
            assert.equal(typeof colour.rgbToHex(255, 255, 255), 'string');
        });

        it('should convert rgb to hex string', function() {
            assert.equal(colour.rgbToHex(255, 255, 255), '#ffffff');
            assert.equal(colour.rgbToHex(217, 10, 26), '#d90a1a');
        });

        it('should cope with missing arguments', function() {
            assert.equal(colour.rgbToHex(255, 255), '#ffff00');
            assert.equal(colour.rgbToHex(255), '#ff0000');
        });

        it('should handle numbers out of bounds', function() {
            assert.equal(colour.rgbToHex(300, 500, 1000), '#ffffff');
            assert.equal(colour.rgbToHex(-300, -500, 1000), '#0000ff');
        });

        it('should handle strings', function() {
            assert.equal(colour.rgbToHex('300', '500', '1000'), '#ffffff');
            assert.equal(colour.rgbToHex('chucknorris', 'nonsense', 'fail'), '#000000');
        });
    });

    describe('checkLuminance', function() {
        it('should return a number', function() {
            assert.equal(typeof colour.checkLuminance(255, 255, 255), 'number');
        });

        it('should give luminance value', function() {
            assert.equal(colour.checkLuminance(255, 255, 255), 254.99999999999997);
            assert.equal(colour.checkLuminance(0, 0, 0), 0);
            assert.equal(colour.checkLuminance(126, 255, 0), 209.16359999999997);
        });

        it('should cope with missing arguments', function() {
            assert.equal(colour.checkLuminance(255, 255), 236.58899999999997);
            assert.equal(colour.checkLuminance(255), 54.213);
            assert.equal(colour.checkLuminance(), 0);
        });

        it('should handle numbers out of bounds', function() {
            assert.equal(colour.checkLuminance(300, 300, 300), 254.99999999999997);
            assert.equal(colour.checkLuminance(-300, -300, -300), 0);
            assert.equal(colour.checkLuminance(-300, 300, -300), 182.37599999999998);
        });

        it('should handle strings as arguments', function() {
            assert.equal(colour.checkLuminance('255', '255', '255'), 254.99999999999997);
            assert.equal(colour.checkLuminance('0', '0', '0'), 0);
            assert.equal(colour.checkLuminance('chucknorris', 'nonsense', 'fail'), 0);
        });
    });
});