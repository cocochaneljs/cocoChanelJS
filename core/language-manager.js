(function() {
    function LanguageManager () {
        this.defaultLanguage = "en";
        this.languages = {};

        this.loadLanguages();
    }

    LanguageManager.prototype.loadLanguages = function () {
        var normalizedPath = require("path").join("resources/language"),
            me = this;

        fileSystem.readdirSync(normalizedPath).forEach(function(file) {

            me.languages[file.split('.')[0]] = require("../resources/language/" + file);
        });
    };

    LanguageManager.prototype.setCurrentLanguage = function(languageConfig) {

    };

    LanguageManager.prototype.getLanguage = function () {
        return this.languages[this.defaultLanguage];
    };


    module.exports = LanguageManager;
})();
