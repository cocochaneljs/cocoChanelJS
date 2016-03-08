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
        require(appURLS.base.data + '/automatedStyleGenerator');
        require(appURLS.base.data + '/dataCCJS');
        require(appURLS.base.data + '/dataObjects');

        // miscenlaneous
        require(appURLS.base.misc + '/keyHandler');
        require(appURLS.base.misc + '/miscFunctions');
        require(appURLS.base.misc + '/cssMagic');
        require(appURLS.base.misc + '/differentLogics');

        // event listener wrapper
        window['EventListenerWrapper'] = require(appURLS.base.core + '/event-listener-wrapper');

        //language
        window['LanguageManager'] = require(appURLS.base.core + '/language-manager');

        //engine
        window['CocoChanelJS'] = require(appURLS.base.core + '/engine');

        //config and plugins
        window['ConfigManager'] = require(appURLS.base.core + '/config-manager');

        //language manager start and load languages
        window['LMInstance'] = new LanguageManager();
        window['LMInstance'].loadLanguages();

        // config and plugins load
        window['CMInstance'] = new ConfigManager();

        //engine start
        window['CCJS'] = new CocoChanelJS();


        // plugin load at the end
        window['CMInstance'].loadPlugins();
    }
    catch (e) {
        // this is solely to show errors in production version
        alert(e);
    }

    setTimeout(function(){
        window['CCJS'].refreshData();
    }, 300);
})();
