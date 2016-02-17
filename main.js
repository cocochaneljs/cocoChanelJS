var app = require('app');
var BrowserWindow = require('browser-window');


app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 1000,
        minHeight: 700,
        title: 'CocoChanelJS'
    });
    
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
