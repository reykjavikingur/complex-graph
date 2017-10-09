require('./router');
require('./components/**/*.js', {mode: 'expand'});

module.exports = new Vue({

    el: 'vl-main',

    template: '<vl-router lost-route="lost"/>',

    data: {}

});
