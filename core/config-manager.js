(function () {
    function ConfigManager () {
        this.loadPlugins();
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
        var normalizedPath = require("path").join("plugins");

        fileSystem.readdirSync(normalizedPath).forEach(function(file) {
          require("../plugins/" + file);
        });
    };

    module.exports = ConfigManager;
})();
