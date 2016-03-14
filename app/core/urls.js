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
            sideModules: '/side-modules',
        };

    for (var p in parents) {
        exports[p] = {};
        exports[p + 'Rel'] = {};

        for (var s in subs) {
            exports[p][s] = path.join(__dirname, parents[p], subs[s]);
            exports[p + 'Rel'][s] = parents[p] + subs[s];
        }

    }
})();
