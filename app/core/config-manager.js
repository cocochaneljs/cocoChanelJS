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
            require(window['CCJS-MAIN-URLS'].appRel.plugins + '/' + file);
        });
    };

    ConfigManager.prototype.loadSideModules = function() {
        fileSystem.readdirSync(window['CCJS-MAIN-URLS'].app.sideModules).forEach(function(file) {
            require(window['CCJS-MAIN-URLS'].appRel.sideModules + '/' + file);
        });
    }

    module.exports = ConfigManager;
})();
