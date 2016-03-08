var packager = require('electron-packager');
var options = {
    arch: 'x64',
    dir: '.',
    platform: 'darwin',
    'app-category-type': 'web',
    out: '../cocoChanelJS-dist',
    overwrite: true,
    ignore: 'node_modules/(electron-prebuilt|electron-packager|asar)'
};

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//  !!! we want the app to be open source even deployed !!!
//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// var asar = require('asar');
//
// var src = './app';
// var dest = 'app.asar';
//
// asar.createPackage(src, dest, function() {
//     console.log('asar: DONE!');
//
//
// });
//
//
packager(options, function done (err, appPath) {
    console.log('packager: DONE!');
});
