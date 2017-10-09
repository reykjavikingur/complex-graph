var template = `
<a class="nav-link" :href="href" :class="{active: isActive}"><slot></slot></a>
`;

module.exports = Vue.component('vl-nav-link', {
    props: ['href'],
    template: template,
    data: function () {
        return {
            currentPath: window.location.pathname
        };
    },
    computed: {
        isActive: function(){
            return this.href === this.currentPath;
        }
    }
});
