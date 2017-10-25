var template = `
<vl-layout>
    <h2>Welcome</h2>
    
    <main>
        
        <cx-graph expr="(z - 1)(z + 1)"></cx-graph>
        
        
    </main>
    
</vl-layout>
`;

module.exports = Vue.component('home-page', {
    template: template
});
