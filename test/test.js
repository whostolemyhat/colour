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
            assert.deepEqual(colour.hexToRgb('fff'), { r: 255, g: 255, b: 255 });
        });
    });
});