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
        
        <div>
            <cx-graph expr="z" radius="3"></cx-graph>z
        </div>
        
        <div>
            <cx-graph expr="z^2" radius="3"></cx-graph>z^2
        </div>
        
        <div>
            <cx-graph expr="z^3" radius="3"></cx-graph>z^3
        </div>
        
        <div>
            <cx-graph expr="e^z" radius="3"></cx-graph>e^z
        </div>
        
        <div>
            <cx-graph expr="cos(z)" radius="3"></cx-graph>cos(z)
        </div>
        
        <div>
            <cx-graph expr="i*sin(z)" radius="3"></cx-graph>i*sin(z)
        </div>
        
        <div>
            <cx-graph expr="z^0.5" radius="3"></cx-graph>z^0.5
        </div>
        
        <div>
            <cx-graph expr="log(z)" radius="3"></cx-graph>log(z)
        </div>
        
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
            expr: '(1 + z)(1 - z)',
            radius: 3,
        };
    },

    computed: {

    }
});
