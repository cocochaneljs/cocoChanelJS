( function() {
    try {
        // app urls
        var appURLS = require('./core/urls');
        window['CCJS-MAIN-URLS'] = appURLS;

        // beautify uses it's own define that's why we load it before
        const ipcMain = require('electron').ipcMain;

        window['beautify_js'] = require('js-beautify'); // also available under "js" export
        window['beautify_css'] = require('js-beautify').css;
        window['beautify_html'] = require('js-beautify').html;
        window['underscorejs'] = require('underscore');

        window['define'] = require('define');

        window['remote'] = require('remote');
        window['dialog'] = window['remote'].require('dialog');
        window['fileSystem'] = require('fs');
        window['codemirror'] = require('codemirror');

        require('codemirror/mode/javascript/javascript');
        require('codemirror/mode/css/css');
        require('codemirror/mode/htmlmixed/htmlmixed');
        require('codemirror/addon/comment/comment');
        require('codemirror/addon/wrap/hardwrap');
        require('codemirror/addon/hint/show-hint');
        require('codemirror/addon/hint/html-hint');

        // data
        require(appURLS.app.data + '/automatedStyleGenerator');
        require(appURLS.app.data + '/dataCCJS');
        require(appURLS.app.data + '/dataObjects');

        // miscenlaneous
        require(appURLS.app.misc + '/keyHandler');
        require(appURLS.app.misc + '/miscFunctions');
        require(appURLS.app.misc + '/cssMagic');
        require(appURLS.app.misc + '/differentLogics');

        // event listener wrapper
        window['EventListenerWrapper'] = require(appURLS.app.core + '/event-listener-wrapper');

        //language
        window['LanguageManager'] = require(appURLS.app.core + '/language-manager');

        //engine
        window['CocoChanelJS'] = require(appURLS.app.core + '/engine');

        //config and plugins
        window['ConfigManager'] = require(appURLS.app.core + '/config-manager');

        //language manager start and load languages
        window['LMInstance'] = new LanguageManager();
        window['LMInstance'].loadLanguages();

        // config and plugins load
        window['CMInstance'] = new ConfigManager();

        //engine start
        window['CCJS'] = new CocoChanelJS();


        // plugin load at the end
        window['CMInstance'].loadPlugins();
        window['CMInstance'].loadSideModules();

        setTimeout(function(){
            window['CCJS'].refreshData();
        }, 300);
    } catch (e) {
        console.log(e);
        alert(e);
    }


})();
