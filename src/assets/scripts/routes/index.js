const math = require('mathjs');

var template = `
<vl-layout>
    <h2>Welcome</h2>
    
    <main>
    
        <p>
            Re(c) = <input type="number" v-model="cx" step="0.1" />
            <br/>
            Im(c) = <input type="number" v-model="cy" step="0.1" />
        </p>
        <p>
            <input type="text" v-model="expr" />
        </p>
        <p>
            radius = <input type="number" v-model="radius" step="0.1" />
        </p>
        
        <cx-graph :expr="expr" :radius="radius" :scope="{c: c}"></cx-graph>
        
        <!--
        <div>
            <cx-graph expr="(e^(i*pi*0/2) * z)^0.5 / e^(i*pi*0/4)" radius="3"></cx-graph>
            <cx-graph expr="(e^(i*pi*1/2) * z)^0.5 / e^(i*pi*1/4)" radius="3"></cx-graph>
            <br/>
            <cx-graph expr="(e^(i*pi*2/2) * z)^0.5 / e^(i*pi*2/4)" radius="3"></cx-graph>
            <cx-graph expr="(e^(i*pi*3/2) * z)^0.5 / e^(i*pi*3/4)" radius="3"></cx-graph>
        </div>
        -->
        
    </main>
    
</vl-layout>
`;

module.exports = Vue.component('home-page', {
    template: template,

    data() {
        return {
            expr: '(c + z)(c - z)',
            radius: 3,
            cx: '1',
            cy: '0',
        };
    },

    computed: {
        c() {
            return math.complex(this.cx, this.cy);
        }
    }
});
