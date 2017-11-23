const template = `
<vl-layout>
    <h2>Gallery</h2>
    <main>
    
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
    
    </main>
    
</vl-layout>
`;

module.exports = Vue.component('gallery-page', {
    template: template,

    data() {
        return {};
    },

});
