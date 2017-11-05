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
function complexGraph(expr, options) {
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
            let c = code.eval({z: math.complex(x, y)});
            let color = smoothColor(c);
            for (let bi = 0; bi < 4; bi++) {
                imageData.data[byteIndex + bi] = color[bi];
            }
        }
    }

    context.putImageData(imageData, 0, 0);
}

function smoothColor(c) {
    var arg = math.arg(c);
    var abs = math.abs(c);
    var hue = (arg + Math.PI) / Math.PI * 180;
    var lum = (abs < 1) ?
        0.5 * Math.sqrt(abs) - 0.1 * (abs % 0.1) :
        Math.log(abs) / 5 + 0.5 - 0.05 * (abs % 1);
    lum *= 100;
    var rgb = Color.hsl(hue, 100, lum).rgb();
    var red = rgb.color[0];
    var grn = rgb.color[1];
    var blu = rgb.color[2];
    var alf = 255;
    return [
        red,
        grn,
        blu,
        alf,
    ];
}

module.exports = complexGraph;
