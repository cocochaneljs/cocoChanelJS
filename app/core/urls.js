( function() {
    var exports = module.exports = {};
    var path = require('path');
    var urls = {},
        parents = {
            app: '..'
        },
        subs = {
            base: '',
            core: '/core',
            misc: '/misc',
            data: '/data',
            resources: '/resources',
            language: '/language',
            plugins: '/plugins',
        };

    for (var p in parents) {
        exports[p] = {};

        for (var s in subs) {
            exports[p][s] = path.join(__dirname, parents[p], subs[s]);
        }

    }
    debugger;
})();
