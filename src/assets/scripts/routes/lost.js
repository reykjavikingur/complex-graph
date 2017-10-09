var template = `
<vl-layout>
    <h2>404 Not Found</h2>
    <main>
        We are unable to find the page you requested.
    </main>
</vl-layout>
`;

module.exports = Vue.component('lost-page', {
    template: template
});
