( function() {
    var exports = module.exports = {};
    var urls = {},
        parents = {
            base: '.',
            app: './app',
            parent: '..'
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
            exports[p][s] = parents[p] + subs[s];
        }

    }
})();
