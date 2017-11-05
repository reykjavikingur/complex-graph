const complexGraph = require('../lib/complex-graph');

var template = `
<canvas ref="canvas" :width="width" :height="height"></canvas>
`;

module.exports = Vue.component('cx-graph', {

    props: ['expr', 'radius'],

    template: template,

    data() {
        return {
            width: 256,
            height: 256
        }
    },

    computed: {
        drawArgs: function() {
            return [this.expr, {
                radius: this.radius,
            }];
        }
    },

    mounted() {
        this.draw.apply(this, this.drawArgs);
    },

    watch: {
        drawArgs: function(val) {
            this.draw.apply(this, this.drawArgs);
        },
    },

    methods: {
        draw(expr, options) {
            var canvas = this.$refs.canvas;
            var context = canvas.getContext('2d');
            var radius = options.radius || 2;
            complexGraph.call(context, expr, {
                minReal: -radius,
                maxReal: +radius,
                minImag: -radius,
                maxImag: +radius,
            });
        }
    }

});
