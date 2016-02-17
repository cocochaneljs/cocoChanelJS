( function() {
    window['remote'] = require('remote');
    window['dialog'] = window['remote'].require('dialog');
    window['fileSystem'] = require('fs');
    window['CocoChanelJS'] = require('./core/engine');

    window['CCJS'] = new CocoChanelJS();
})();
