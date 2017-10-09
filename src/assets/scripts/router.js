const RouterModel = require('./util/router-model');
const QueryString = require('query-string');

var routeHash = require('./routes/**/*.js', {mode: 'hash'});

module.exports = Vue.component('vl-router', {

    props: ['lostRoute'],

    data: function () {
        return {
            routeHash: routeHash,
            currentPath: window.location.pathname,
        };
    },

    computed: {

        ViewComponent: function () {
            var template = this.computeTemplate(this.currentPath);
            return {
                template: template
            };
        }

    },

    mounted: function () {
        window.onpopstate = event => {
            this.currentPath = window.location.pathname;
        };
    },

    render: function (h) {
        return h(this.ViewComponent);
    },

    methods: {

        computeTemplate: function (urlPath) {
            var router = new RouterModel(Object.keys(this.routeHash));
            var paths = router.splitRoute(urlPath);
            var route = paths[0];
            var extra = paths[1];
            var component = route ? this.routeHash[route] : this.routeHash[this.lostRoute || '404'];
            var template;
            if (component) {
                try {
                    // TODO pass data parsed from query
                    // TODO validate component.options.name
                    // TODO validate extra
                    var query = JSON.stringify(QueryString.parse(window.location.search));
                    template = `<${component.options.name} path="${extra}" query='${query}'/>`;
                }
                catch (e) {
                    template = `<div>Internal Error</div>`;
                }
            }
            else {
                template = `<div>Page Not Found</div>`;
            }
            return template;
        },

    }

});
