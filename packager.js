var packager = require('electron-packager');
var options = {
    arch: 'x64',
    dir: '.',
    platform: 'darwin',
    'app-category-type': 'web',
    out: '../cocoChanelJS-dist',
    overwrite: true,
    ignore: 'node_modules/(electron-prebuilt|electron-packager)'
};

packager(options, function done (err, appPath) {
    console.log(err);
    console.log(appPath);
});
