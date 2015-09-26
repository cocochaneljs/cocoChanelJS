(function() {
function CSS_MAGIC() {};

CSS_MAGIC.prototype.parse = function (cssText) {
    var cssObject = {},
        cssStatements = this.split(cssText, ';');

    for (var i=0,ln=cssStatements.length; i<ln; i++) {
        if (!cssStatements[i])
            continue;

        var statementValue =  this.split(cssStatements[i],':');

        if (statementValue.length == 2)
            cssObject[statementValue[0].replace(/\s*/g,'')] = statementValue[1].replace(/^\s/, '');
    }

    return this.purge(cssObject);
}

CSS_MAGIC.prototype.stringify = function (cssObject) {
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

CSS_MAGIC.prototype.split = function (string,byCharacter) {
    var arr = [],
        currentStringBuildup = "",
        inParanthesis = false;
    for (var i = 0, ln = string.length; i < ln; i++) {
        var character = string.substring(i,i+1);

        if (character != byCharacter || inParanthesis)
            currentStringBuildup += character;

        if (!inParanthesis && character == "(")
            inParanthesis = true;

        if (inParanthesis && character == ")")
            inParanthesis = false;

        if (!inParanthesis && character == byCharacter || i +1 >= ln) {
            arr.push(currentStringBuildup);
            currentStringBuildup = "";
        }
    }
    return arr;
}



window['CSSMagic'] = new CSS_MAGIC();
})();
