var template = `
<vl-layout>
    <h2>Welcome</h2>
    
    <main>
        
        <cx-graph expr="(1 + z)(1 - z)"></cx-graph>
        
        
    </main>
    
</vl-layout>
`;

module.exports = Vue.component('home-page', {
    template: template
});
