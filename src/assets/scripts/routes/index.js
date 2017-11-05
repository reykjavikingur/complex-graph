var template = `
<vl-layout>
    <h2>Welcome</h2>
    
    <main>
    
        <p>
            <input type="text" v-model="expr" />
        </p>
        <p>
            <input type="number" v-model="radius" />
        </p>
        
        <cx-graph :expr="expr" :radius="radius"></cx-graph>
        
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
    }
});
