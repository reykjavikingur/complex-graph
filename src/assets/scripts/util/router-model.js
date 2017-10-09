class RouterModel {

    constructor(availableRoutes) {
        this.availableRoutes = availableRoutes;
    }

    findRoute(url) {
        var route = this.convertUrlToRoute(url);
        var availableRoute = this.findAvailableRoute(route);
        return availableRoute;
    }

    splitRoute(url) {
        var foundRoute = this.findRoute(url);
        var extra = '';
        if (foundRoute) {
            var fullRoute = this.convertUrlToRoute(url);
            // for example, url is "/product/abc", foundRoute is "product", fullRoute is "product/abc"
            extra = this.normalizePath(fullRoute.replace(foundRoute, extra));
        }
        return [foundRoute, extra];
    }

    convertUrlToRoute(url) {
        return this.normalizePath(url) || 'index';
    }

    normalizePath(path) {
        return String(path).split('/').filter(part => part).join('/')
    }

    findAvailableRoute(route) {
        if (!route) {
            return;
        }
        else if (this.availableRoutes.indexOf(route) >= 0) {
            return route;
        }
        else {
            return this.findAvailableRoute(this.dotdot(route));
        }
    }

    dotdot(route) {
        var parts = route.split('/');
        parts.pop();
        return parts.join('/');
    }
}

module.exports = RouterModel;
