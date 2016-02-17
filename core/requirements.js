( function() {
    window['remote'] = require('remote');
    window['dialog'] = window['remote'].require('dialog');
    window['fileSystem'] = require('fs');

    require('./data/automatedStyleGenerator');
    require('./data/dataCCJS');
    require('./data/dataObjects');


    require('./misc/keyHandler');
    require('./misc/miscFunctions');
    require('./misc/cssMagic');
    require('./misc/differentLogics');

    window['CocoChanelJS'] = require('./core/engine');
    window['ConfigManager'] = require('./core/config-manager');

    window['CCJS'] = new CocoChanelJS();
    window['CMInstance'] = new ConfigManager();
})();
