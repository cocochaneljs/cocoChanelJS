( function() {
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
    require('./data/automatedStyleGenerator');
    require('./data/dataCCJS');
    require('./data/dataObjects');

    // miscenlaneous
    require('./misc/keyHandler');
    require('./misc/miscFunctions');
    require('./misc/cssMagic');
    require('./misc/differentLogics');

    // event listener wrapper
    window['EventListenerWrapper'] = require('./core/event-listener-wrapper');

    //language
    window['LanguageManager'] = require('./core/language-manager');

    //engine
    window['CocoChanelJS'] = require('./core/engine');

    //config and plugins
    window['ConfigManager'] = require('./core/config-manager');

    //language manager start
    window['LMInstance'] = new LanguageManager();

    //engine start
    window['CCJS'] = new CocoChanelJS();

    // config and plugins load
    window['CMInstance'] = new ConfigManager();


    setTimeout(function(){
        window['CCJS'].refreshData();
    }, 300);
})();
