(function () {
    function ConfigManager () {
    }

    ConfigManager.prototype.loadConfig = function() {
        // @TODO
    };

    ConfigManager.prototype.saveConfig = function() {
        // @TODO
    };

    ConfigManager.prototype.generateConfig = function() {
        // @TODO

        this.saveConfig();
    };

    ConfigManager.prototype.loadPlugins = function () {
        fileSystem.readdirSync(window['CCJS-MAIN-URLS'].app.plugins).forEach(function(file) {
            require("../plugins/" + file);
        });
    };

    ConfigManager.prototype.loadSidePlugins = function() {
        fileSystem.readdirSync(window['CCJS-MAIN-URLS'].app.sidePlugins).forEach(function(file) {
            require("../side-plugins/" + file);
        });
    }

    module.exports = ConfigManager;
})();
