var packager = require('electron-packager');
var options = {
    arch: 'x64',
    dir: '.',
    platform: 'all',
    all: true,
    'app-category-type': 'web',
    out: './dist',
    ignore: "node_modules/(electron-packager|electron-prebuilt)"
};

packager(options, function done (err, appPath) {});
