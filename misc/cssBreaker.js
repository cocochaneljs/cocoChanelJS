function CSS_BREAK (cssText) {
    var cssObject = {},
        cssStatements = cssText.split(';');

    for (var i=0,ln=cssStatements.length; i<ln; i++) {
        if (!cssStatements[i])
            continue;

        var statementValue = cssStatements[i].split(':');
        cssObject[statementValue[0].replace(/\s*/g,'')] = statementValue[1].replace(/^\s*/, '');
    }

    return cssObject;
}
