var template = `
<vl-layout>
    <h2>Natural Logarithm</h2>
    
    <!--
    <cx-graph radius="3" :scope="{angle:angle}" expr="log(z * e^(i * angle)) - i * angle"></cx-graph>
    -->
    
    <div 
        >
        <cx-graph
            v-for="angle in angles"
            radius="3" 
            :scope="{angle:angle}" 
            expr="log(z * e^(i * angle)) - i * angle"
        ></cx-graph>
    </div>
    
</vl-layout>
`;

module.exports = Vue.component('natlog-page', {
    template: template,

    data() {
        return {
            angle: 0,
            animating: false,
            angles: [
                Math.PI * -4/2,
                Math.PI * -3/2,
                Math.PI * -2/2,
                Math.PI * -1/2,
                Math.PI * +0/2,
                Math.PI * +1/2,
                Math.PI * +2/2,
                Math.PI * +3/2,
                Math.PI * +4/2,
            ]
        };
    },

    mounted() {
        //this.start();
    },

    destroyed() {
        this.stop();
    },

    methods: {
        start() {
            this.animating = true;
            this.animate();
        },
        stop() {
            this.animating = false;
        },
        animate() {
            this.angle += 0.157;
            if (this.angle > Math.PI * 4) {
                this.angle = Math.PI * -4;
            }
            if (this.animating) {
                window.requestAnimationFrame(() => {
                    this.animate();
                });
            }
        }
    },

});