var template = `
<vl-layout>
    <h2>Welcome</h2>
    
    <main>
    
        <p>
            <input type="text" v-model="expr" />
        </p>
        <p>
            radius = <input type="number" v-model="radius" step="0.1" />
        </p>
        
        <cx-graph :expr="expr" :radius="radius"></cx-graph>
        
        <hr/>
        
        <cx-graph expr="z" radius="3"></cx-graph>
        <cx-graph expr="z^2" radius="3"></cx-graph>
        <br/>
        <cx-graph expr="(e^(i*pi*0/2) * z)^0.5 / e^(i*pi*0/4)" radius="3"></cx-graph>
        <cx-graph expr="(e^(i*pi*1/2) * z)^0.5 / e^(i*pi*1/4)" radius="3"></cx-graph>
        <br/>
        <cx-graph expr="(e^(i*pi*2/2) * z)^0.5 / e^(i*pi*2/4)" radius="3"></cx-graph>
        <cx-graph expr="(e^(i*pi*3/2) * z)^0.5 / e^(i*pi*3/4)" radius="3"></cx-graph>
        
    </main>
    
</vl-layout>
`;

module.exports = Vue.component('home-page', {
    template: template,

    data() {
        return {
            expr: '(1 + z)(1 - z)',
            radius: 3,
        };
    },

    computed: {

    }
});
