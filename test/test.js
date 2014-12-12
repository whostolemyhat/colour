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

        it('should calculate luminance value', function() {
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

    describe('checkLuminanceHex', function() {
        it('should return a number', function() {
            assert.equal(typeof colour.checkLuminanceHex('#ffffff'), 'number');
        });

        it('should calculate luminance', function() {
            assert.equal(colour.checkLuminanceHex('#ffffff'), 254.99999999999997);
            assert.equal(colour.checkLuminanceHex('#000000'), 0);
            assert.equal(colour.checkLuminanceHex('#d90a1a'), 55.1634);
        });

        it('should handle shorthand', function() {
            assert.equal(colour.checkLuminanceHex('#fff'), 254.99999999999997);
            assert.equal(colour.checkLuminanceHex('#000'), 0);
            assert.equal(colour.checkLuminanceHex('#d90'), 156.41019999999997);
        });

        it('should not require a hash', function() {
            assert.equal(colour.checkLuminanceHex('d90'), 156.41019999999997);
            assert.equal(colour.checkLuminanceHex('fff'), 254.99999999999997);
            assert.equal(colour.checkLuminanceHex('ffffff'), 254.99999999999997);
            assert.equal(colour.checkLuminanceHex('000'), 0);
        });

        it('should return null for unknown strings', function() {
            assert.equal(colour.checkLuminanceHex('ffff'), null);
            assert.equal(colour.checkLuminanceHex('chucknorris'), null);
            assert.equal(colour.checkLuminanceHex('#fffffff'), null);
            assert.equal(colour.checkLuminanceHex('#ff'), null);
        });
    });

    describe('alterShade', function() {
        it('should return a string', function() {
            assert.equal(typeof colour.alterShade('#333', 0.4), 'string');
        });

        it('should change shade', function() {
            assert.equal(colour.alterShade('#333333', 0.4), '#474747');
            assert.equal(colour.alterShade('#999999', 0.4), '#d6d6d6');
        });

        it('should accept shorthand hex', function() {
            assert.equal(colour.alterShade('#333', 0.4), '#474747');
            assert.equal(colour.alterShade('#999', 0.4), '#d6d6d6');
        });

        it('should accept hex without hash', function() {
            assert.equal(colour.alterShade('333', 0.4), '#474747');
            assert.equal(colour.alterShade('333333', 0.4), '#474747');
            assert.equal(colour.alterShade('999', 0.4), '#d6d6d6');
            assert.equal(colour.alterShade('999999', 0.4), '#d6d6d6');
        });

        it('should accept 0 luminance values', function() {
            assert.equal(colour.alterShade('#333', 0), '#333333');
            assert.equal(colour.alterShade('#999', 0), '#999999');
        });

        it('should accept negative luminance values', function() {
            assert.equal(colour.alterShade('#333', -0.4), '#1f1f1f');
            assert.equal(colour.alterShade('#999', -0.4), '#5c5c5c');
        });

        it('should accept high luminance values', function() {
            assert.equal(colour.alterShade('#333', 20), '#ffffff');
            assert.equal(colour.alterShade('#999', 20), '#ffffff');
            assert.equal(colour.alterShade('#333', -20), '#000000');
            assert.equal(colour.alterShade('#999', -20), '#000000');
        });

        it('should throw error on incorrect values', function() {
            assert.throws(colour.alterShade('not a real colour', 0.2), TypeError);
            assert.throws(colour.alterShade('not a real colour', 'also broken'), TypeError);
        });
    });
});