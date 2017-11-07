const math = require('mathjs');
const Color = require('color');

/**
 * Draws complex graph on canvas.
 * To be invoked in context of a 2D canvas context.
 *
 * @param expr {String} math expression for complex function in terms of "z"
 * @param options {Object} the options
 *
 * Available options:
 * radius {Number}
 *
 */
function complexGraph(expr, scope, options) {
    var context = this;
    var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

    var minPx = 0, minPy = 0, maxPx = imageData.width - 1, maxPy = imageData.height - 1;
    var xScale = (options.maxReal - options.minReal) / (maxPx - minPx);
    var yScale = (options.maxImag - options.minImag) / (maxPy - minPy);
    var code = math.compile(expr);

    for (let px = 0; px < imageData.width; px++) {
        for (let py = 0; py < imageData.height; py++) {
            let byteIndex = (py * imageData.width + px) * 4;
            let x = px * xScale + options.minReal;
            let y = -(py * yScale + options.minImag);
            scope.z = math.complex(x, y);
            let c = code.eval(scope);
            let color = smoothColor(c);
            for (let bi = 0; bi < 4; bi++) {
                imageData.data[byteIndex + bi] = color[bi];
            }
        }
    }

    context.putImageData(imageData, 0, 0);
}

function smoothColor(c) {
    var re, im;
    if (typeof c === 'number') {
        re = c;
        im = 0;
    }
    else {
        re = c.re;
        im = c.im;
    }
    var arg = Math.atan2(im, re);
    var abs = Math.sqrt(re * re + im * im);
    var hue = (arg + Math.PI);
    var lum = (abs < 1) ?
        0.5 * Math.sqrt(abs) - 0.1 * (abs % 0.1) :
        Math.log(abs) / 5 + 0.5 - 0.05 * (abs % 1);
    //lum *= 100;
    return hsl2rgb_(hue, 1, lum);
}

function hsl2rgb(hue, sat, lum) {
    var rgb = Color.hsl(hue / Math.PI * 180, sat * 100, lum * 100).rgb();
    var color = rgb.color;
    return [
        color[0],
        color[1],
        color[2],
        255,
    ];
}

function hsl2rgb_(hue, sat, lum) {
    var H = hue / (Math.PI / 3); // H is between 0 and 6, inclusive
    var C = sat * (1 - Math.abs(2 * lum - 1));
    var X = C * (1 - Math.abs(H % 2 - 1));
    var m = lum - 0.5 * C;
    var RGB;
    if (H < 1) {
        RGB = [C, X, 0];
    }
    else if (H < 2) {
        RGB = [X, C, 0];
    }
    else if (H < 3) {
        RGB = [0, C, X];
    }
    else if (H < 4) {
        RGB = [0, X, C];
    }
    else if (H < 5) {
        RGB = [X, 0, C];
    }
    else {
        RGB = [C, 0, X];
    }
    var r = (RGB[0] + m) * 255;
    var g = (RGB[1] + m) * 255;
    var b = (RGB[2] + m) * 255;
    return [r, g, b, 255];
}

module.exports = complexGraph;
