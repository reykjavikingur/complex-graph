var template = `
<vl-layout>
    <h2>Square Root</h2>
    
    <cx-graph radius="3" :scope="{angle:angle}" expr="(e^(i*pi*angle/2) * z)^0.5 / e^(i*pi*angle/4)"></cx-graph>
    
</vl-layout>
`;

module.exports = Vue.component('sqrt-page', {
    template: template,

    data() {
        return {
            angle: 0,
            animating: true
        };
    },

    mounted() {
        this.animate();
    },

    destroyed() {
        console.log('sqrt destroyed');
        this.animating = false;
    },

    methods: {
        animate() {
            this.angle += 0.05;
            if (this.animating) {
                window.requestAnimationFrame(() => {
                    this.animate();
                });
            }
        }
    },

});