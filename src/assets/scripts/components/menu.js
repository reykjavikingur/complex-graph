var template = `
<ul class="menu">
    <li><vl-nav-link href="/">Home</vl-nav-link></li>
    <li><vl-nav-link href="/sqrt">Square Root</vl-nav-link></li>
    <li><vl-nav-link href="/natlog">Natural Logarithm</vl-nav-link></li>
    <li><vl-nav-link href="/about">About</vl-nav-link></li>
</ul>
`;

module.exports = Vue.component('vl-menu', {
    template: template
});
