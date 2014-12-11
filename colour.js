// colour.js
// Colour transformation utilities. Mainly from Stack Overflow
// MIT licence

/**
* hexToRgb
* Changes a colour in hex format to an rgb value
*
* @param hex [string] - colour in hex. Can have preceding # sign, can be shorhand or full-length ie 3 or 6 digit
* @returns [object] - object containing the r, g, and b components of the colour
*/
function hexToRgb(hex) {
    'use strict';

    // convert to string
    hex = hex + '';

    var shorthandRegex, result;
    // Expand shorthand form (e.g. "04F") to full form (e.g. "0033FF")
    shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


/**
* componentToHex
* Converts a number representing either the r, g, or b value of a colour into its' hex representation
*
* @param c [number] - number between 0-255 inclusive
* @returns [string] - hex representation of a single colour component
*/
function componentToHex(c) {
    'use strict';
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}


/**
* rgbToHex
* Converts an rgb representation of a colour into hex format
*
* @param r [number] - number between 0-255 inclusive; red component of colour
* @param g [number] - number between 0-255 inclusive; green component of colour
* @param b [number] - number between 0-255 inclusive; blue component of colour
* @returns [string] - colour in hex format
*/
function rgbToHex(r, g, b) {
    'use strict';
    r = parseInt(r, 10) || 0;
    if(r > 255) {
        r = 255;
    }
    if(r < 0) {
        r = 0;
    }

    g = parseInt(g, 10) || 0;
    if(g > 255) {
        g = 255;
    }
    if(g < 0) {
        g = 0;
    }

    b = parseInt(b, 10) || 0;
    if(b > 255) {
        b = 255;
    }
    if(b < 0) {
        b = 0;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


/**
* checkLuminance
* Checks the overall luminance of a colour (how light or dark the colour is)
*
* @param r [number] - number between 0-255 inclusive; red component of colour
* @param g [number] - number between 0-255 inclusive; green component of colour
* @param b [number] - number between 0-255 inclusive; blue component of colour
* @returns [number] - floating point between 0-255 inclusive representing overall brightness of colour
*/
function checkLuminance(r, g, b) {
    //http://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
    'use strict';
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma;
}


/**
* checkLuminanceHex
* Checks the overall luminance of a colour (how light or dark the colour is)
*
* @param hex [string] - colour to check in hex format
* @returns [number] - floating point between 0-255 inclusive representing overall brightness of colour
*/
function checkLuminanceHex(hex) {
    'use strict';
    var rgb = hexToRgb(hex);
    return checkLuminance(rgb.r, rgb.g, rgb.b);
}


/**
* alterShade
* Changes the shade of a colour
* usage alterShade('#69c', 0.2) = '#7ab8f5': 20% lighter
*
* @param hex [string] - string representing the colour in hex format eg #ff1133. # at start optional. Can be 3- or 6-digit format
* @param lum [number] - decimal representing % lighter to make the colour. Can be negative to make darker.
* @returns [string] - hex value of new shade
*/
function alterShade(hex, lum) {
    'use strict';

    // strip hex to make sure only numbers
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    // make sure always 6 digits
    if(hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    lum = lum || 0;

    var rgb = '#';
    var c;
    var i;
    for(i = 0; i < 3; i++) {
        // convert to decimal
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }

    return rgb;
}

module.exports = {
    hexToRgb: hexToRgb,
    rgbToHex: rgbToHex,
    checkLuminance: checkLuminance,
    checkLuminanceHex: checkLuminanceHex,
    alterShade: alterShade
};