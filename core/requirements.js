( function() {
    window['remote'] = require('remote');
    window['dialog'] = window['remote'].require('dialog');
    window['fileSystem'] = require('fs');

    // data
    require('./data/automatedStyleGenerator');
    require('./data/dataCCJS');
    require('./data/dataObjects');

    // miscenlaneous
    require('./misc/keyHandler');
    require('./misc/miscFunctions');
    require('./misc/cssMagic');
    require('./misc/differentLogics');

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
})();
