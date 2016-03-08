(function() {
    function LanguageManager () {
        this.defaultLanguage = "en";
        this.languages = {};
    }

    LanguageManager.prototype.loadLanguages = function () {
        var me = this;

        fileSystem.readdirSync(window['CCJS-MAIN-URLS'].app.language).forEach(function(file) {
            me.languages[file.split('.')[0]] = require("../language/" + file);
        });
    };

    LanguageManager.prototype.setCurrentLanguage = function(languageConfig) {

    };

    LanguageManager.prototype.getLanguage = function () {
        return this.languages[this.defaultLanguage];
    };

    module.exports = LanguageManager;
})();
