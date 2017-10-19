const math = require('mathjs');
const Color = require('color');

var template = `
<canvas ref="canvas" :width="width" :height="height"></canvas>
`;

module.exports = Vue.component('cx-graph', {

    props: ['expr'],

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

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var radius = 2;
        this.graph(imageData, {
            expr: this.expr,
            minReal: -radius,
            maxReal: +radius,
            minImag: -radius,
            maxImag: +radius,
        });
        context.putImageData(imageData, 0, 0);
    },

    methods: {
        graph(imageData, options) {
            var minPx = 0, minPy = 0, maxPx = imageData.width - 1, maxPy = imageData.height - 1;
            var xScale = (options.maxReal - options.minReal) / (maxPx - minPx);
            var yScale = (options.maxImag - options.minImag) / (maxPy - minPy);
            var code = math.compile(this.expr);

            for (let px = 0; px < imageData.width; px++) {
                for (let py = 0; py < imageData.height; py++) {
                    let byteIndex = (py * imageData.width + px) * 4;
                    let x = px * xScale + options.minReal;
                    let y = -(py * yScale + options.minImag);
                    let c = code.eval({z: math.complex(x, y)});
                    let color = this.smoothColor(c);
                    for (let bi = 0; bi < 4; bi++) {
                        imageData.data[byteIndex + bi] = color[bi];
                    }
                }
            }
        },
        smoothColor(c) {
            var arg = math.arg(c);
            var abs = math.abs(c);
            var hue = arg / Math.PI * 180;
            var lumInc = 5;
            var lum = Math.floor(abs * 50 / lumInc) * lumInc;
            var rgb = Color.hsl(hue, 100, lum).rgb();
            var red = rgb.color[0];
            var grn = rgb.color[1];
            var blu = rgb.color[2];
            var alf = rgb.valpha * 255;
            return [
                Math.round(red),
                Math.round(grn),
                Math.round(blu),
                Math.round(alf)
            ];
        }
    }

});
