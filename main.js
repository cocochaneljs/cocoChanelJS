var app = require('app');
var BrowserWindow = require('browser-window');

app.commandLine.appendSwitch('disable-web-security');

app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 1000,
        minHeight: 700,
        title: 'CocoChanelJS',
        "node-integration": "iframe", // and this line
        "web-preferences": {
            "web-security": false
        }
    });
    
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
