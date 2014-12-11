var assert = require('assert');
var colour = require('../colour');

describe('colour', function() {
    describe('hexToRgb', function() {
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
});