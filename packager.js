var packager = require('electron-packager');

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


// osx
packager({
        arch: 'all',
        dir: '.',
        platform: 'darwin',
        'app-category-type': 'web',
        out: '../cocoChanelJS-dist',
        overwrite: true,
        ignore: 'node_modules/(electron-prebuilt|electron-packager|asar)',
        icon: './app/resources/logo/inkscape-ccjs-logo'
    }, function (err, appPath) {
        done('Mac OSX', err, appPath);

});

// linux
packager({
        arch: 'all',
        dir: '.',
        platform: 'linux',
        'app-category-type': 'web',
        out: '../cocoChanelJS-dist',
        overwrite: true,
        ignore: 'node_modules/(electron-prebuilt|electron-packager|asar)',
        icon: './app/resources/logo/inkscape-ccjs-logo'
    }, function (err, appPath) {
        done('Linux', err, appPath);
});

// windows
packager({
        arch: 'all',
        dir: '.',
        platform: 'darwin',
        'app-category-type': 'web',
        out: '../cocoChanelJS-dist',
        overwrite: true,
        ignore: 'node_modules/(electron-prebuilt|electron-packager|asar)',
        icon: './app/resources/logo/inkscape-ccjs-logo'
    }, function (err, appPath) {
        done('Windows', err, appPath);
});


function done(app, err, appPath) {
    console.log('\n\n');
    console.log(app,'TASK DONE');

    if (appPath && appPath.length)
        console.log('URLs:' , appPath);
    else
        console.log('NOT COMPILED');

    if (err)
        console.log('Error:', err);

    console.log('\n\n');
}
