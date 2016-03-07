var inDevelopment = true;


var app = require('app');
var BrowserWindow = require('browser-window');

app.commandLine.appendSwitch('disable-web-security');
app.setName('CocoChanelJS');

app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        show: false,
        width: 1000,
        height: 700,
        minWidth: 1000,
        minHeight: 700,
        title: 'CocoChanelJS',
        icon: __dirname + '/resources/logo/final.png',
        "node-integration": "iframe", // and this line
        "web-preferences": {
            "web-security": false
        }
    });

    if (! inDevelopment) {
        mainWindow.setMenu(null);
    }

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.show();
});
