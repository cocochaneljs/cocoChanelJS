var inDevelopment = true;


var app = require('app');
var BrowserWindow = require('browser-window');
var Tray = require('tray');

app.commandLine.appendSwitch('disable-web-security');
app.setName('CocoChanelJS');

app.on('ready', function () {
    var appIcon = new Tray(__dirname + '/app/resources/logo/inkscape-ccjs-logo.png');
    var mainWindow = new BrowserWindow({
        show: false,
        width: 1000,
        height: 700,
        minWidth: 1000,
        minHeight: 700,
        title: 'CocoChanelJS',
        icon: __dirname + '/app/resources/logo/inkscape-ccjs-logo.png',
        "node-integration": "iframe", // and this line
        "web-preferences": {
            "web-security": false
        }
    });

    if (! inDevelopment) {
        mainWindow.setMenu(null);
    }

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
    mainWindow.show();
});

app.on('window-all-closed', function() {
    app.quit();
});
