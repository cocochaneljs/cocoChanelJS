(function() {
function CSS_MAGIC() {};

CSS_MAGIC.prototype.parse = function (cssText) {
    var cssObject = {},
        cssStatements = cssText.split(';');

    for (var i=0,ln=cssStatements.length; i<ln; i++) {
        if (!cssStatements[i])
            continue;

        var statementValue = cssStatements[i].split(':');
        cssObject[statementValue[0].replace(/\s*/g,'')] = statementValue[1].replace(/^\s*/, '');
    }

    return this.purge(cssObject);
}

CSS_MAGIC.prototype.strigify = function (cssObject) {
    var str = "";

    cssObject = this.purge(cssObject);

    for (var key in cssObject)
        str += key + ":" + cssObject[key] + ";";

    return str;
}

CSS_MAGIC.prototype.addStatement = function (cssObject, statement, value) {
    cssObject[statement] = value;
    return cssObject;
}

CSS_MAGIC.prototype.removeStatement = function (cssObject, statement) {
    delete cssObject[statement];
    return cssObject;
}

CSS_MAGIC.prototype.purge = function (cssObject) {
    for (var key in cssObject) {
        if (! cssObject[key])
            delete cssObject[key];
    }

    delete cssObject[''];
    return cssObject;
}

window['CSSMagic'] = new CSS_MAGIC();
})();
