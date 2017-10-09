var template = `
<vl-layout>
    <h2>Product</h2>
    <main>
        <div>path = {{path}}</div>
        <div>query = {{query}}</div>
    </main>
</vl-layout>
`;

module.exports = Vue.component('product-page', {
    props: ['path', 'query'],
    template: template
});
