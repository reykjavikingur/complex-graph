const math = require('mathjs');

var template = `
<canvas ref="canvas" :width="width" :height="height"></canvas>
`;

module.exports = Vue.component('cx-graph', {

    template: template,

    data() {
        return {
            width: 256,
            height: 256
        }
    },

    mounted() {
        var canvas = this.$refs.canvas;
        var context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        this.graph(imageData, {
            minReal: -2,
            maxReal: +2,
            minImag: -2,
            maxImag: +2
        });
        context.putImageData(imageData, 0, 0);
    },

    methods: {
        graph(imageData, options) {
            var minPx = 0, minPy = 0, maxPx = imageData.width - 1, maxPy = imageData.height - 1;
            var xScale = (options.maxReal - options.minReal) / (maxPx - minPx);
            var yScale = (options.maxImag - options.minImag) / (maxPy - minPy);

            for (let px = 0; px < imageData.width; px++) {
                for (let py = 0; py < imageData.height; py++) {
                    let byteIndex = (py * imageData.width + px) * 4;
                    let x = px * xScale + options.minReal;
                    let y = -(py * yScale + options.minImag);
                    let c = math.complex(x, y);
                    let color = this.color(c);
                    for (let bi = 0; bi < 4; bi++) {
                        imageData.data[byteIndex + bi] = color[bi];
                    }
                }
            }
        },
        color(c) {
            var arg = math.arg(c);
            var abs = math.abs(c);
            var inc = 0.2;
            var log = math.floor(math.log(abs));
            var hi = Math.round(255 * Math.max(0, Math.min(1, 1 + inc * log)));
            var lo = Math.round(255 * Math.max(0, Math.min(1, 0 + inc * log)));

            if (arg < -.5 * Math.PI) {
                return [lo, lo, hi, 255];
            }
            else if (arg < 0) {
                return [hi, lo, hi, 255];
            }
            else if (arg < .5 * Math.PI) {
                return [hi, lo, lo, 255];
            }
            else {
                return [lo, hi, lo, 255];
            }
        }
    }

});
