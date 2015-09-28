(function() {
    window['CCJS_AUTHORS'] = [
        'Andrei Bazavan'
    ];

    window['CCJS_ELEMENTS'] = [
        'div','table','p','a','img','video','canvas','link',
        'sub','sup','mark','b','audio','style','input','textarea',
        'form','button','code','pre','hr','br','label','noscript', 'script',
        'q','area','article','aside','blockquote','caption','datalist','cite',
        'header','footer','nav','main','meter','menuitem','menu','source','section',
        'span','summary','table','tr','td','ul','ol','li'
    ];

})();


function CCJS_GEN_INJECTION_CSS (selector) {
    return [
         selector,'{',
            '-moz-animation-duration: 300ms;',
            '-webkit-animation-duration: 300ms;',
            'animation-duration: 300ms;',
            '-moz-animation-name: slidein;',
            '-webkit-animation-name: slidein;',
            'animation-name: slidein;',
            '-moz-animation-iteration-count: infinite;',
            '-webkit-animation-iteration-count: infinite;',
            'animation-iteration-count: infinite;',
            '-moz-animation-direction: alternate-reverse;',
            '-webkit-animation-direction: alternate-reverse;',
            'animation-direction: alternate-reverse;',
        '}',

        '@-moz-keyframes slidein {',
            'from {',
                'outline: 2px dotted #00d;',
            '}',

            'to {',
                'outline: 2px dotted #d00;',
            '}',
        '}',

        '@-webkit-keyframes slidein {',
        'from {',
            'outline: 2px dotted #00d;',
        '}',

        'to {',
            'outline: 2px dotted #d00;',
        '}',
        '}',

        '@keyframes slidein {',
            'from {',
                'outline: 2px dotted #00d;',
            '}',

            'to {',
                'outline: 2px dotted #d00;',
            '}',
        '}'
    ].join('');
}

function CCJS_GEN_INJECTION_JS (uniqueIdAttribute) {
    return [
        '(function() {',
            '/*origin lie*/',
            'document.origin = "https://github.com/rokyed/cocoChanelJS.git";',
            'document.addEventListener("click",function(e){',
                'top.postMessage(JSON.stringify(["click",e.target.nodeName,e.target.getAttribute("',
                uniqueIdAttribute,
                '")]),"*");',
                'console.log("click");',
            '});',
            'document.addEventListener("hover",function(e){',
                'top.postMessage(JSON.stringify(["hover",e.target.nodeName,e.target.getAttribute("',
                uniqueIdAttribute,
                '")]),"*");',
                'console.log("hover");',
            '});',
        '})();'
    ].join('');
}
