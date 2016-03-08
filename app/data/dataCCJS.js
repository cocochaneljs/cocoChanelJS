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

    window['CCJS_MESURE_UNITS'] = [
        'px','%','em','cm','mm','in','pt','pc','auto'
    ]

    window['CCJS_URLS'] = {
        plugins: 'plugins/',
        language: 'resources/language/',
        images: 'resources/images',
        pluginStylesheets: 'resources/stylesheets/plugins/'
    }

    function CCJS_ELEMENT_LIST_STRUCTURE (data) {
        return [
            '<div title="', data.selectTitle, '" ',
            (data.extraDATA ? data.extraDATA: ''),
            ' class="element-selection-button ',
            (data.itemClass ? data.itemClass: ''),
            '" data-tree-depth="',data.treeDepth,'"',
            (data.isUntoucheable ? (data.untoucheable + '="true"') :''),
            'data-selector="', data.dataSelector, '" data-type="',data.dataType,'">',
                '<div title="', data.collapseTitle, '" class="flex column collapse-element" ',
                    (!! data.collapsed ? 'data-element-list-collapsed="true"': ''),
                ,'>',
                    (data.collapsed ? "+" : "-"),
                '</div>',
                '<div class="flex column">',
                    '<sub class="element-tiny-info node-name">', data.dataType,'</sub>',
                    '<sup class="element-tiny-info data-slector">',data.dataSelector,'</sup>',
                '</div>',
                '<div class="flex column">',
                    '<sub class="element-tiny-info class-listing">',data.className,'</sub>',
                    '<sup class="element-tiny-info id-listing">',data.id,'</sup>',
                '</div>',
            '</div>'
        ].join('');
    }


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
                    'console.log(JSON.stringify(["click",e.target.nodeName,e.target.getAttribute("',
                    uniqueIdAttribute,
                    '")]),"*");',
                '});',
                'document.addEventListener("hover",function(e){',
                    'console.log(JSON.stringify(["hover",e.target.nodeName,e.target.getAttribute("',
                    uniqueIdAttribute,
                    '")]),"*");',
                '});',
            '})();'
        ].join('');
    }

    window['CCJS_GEN_INJECTION_JS'] = CCJS_GEN_INJECTION_JS;
    window['CCJS_GEN_INJECTION_CSS'] = CCJS_GEN_INJECTION_CSS;
    window['CCJS_ELEMENT_LIST_STRUCTURE'] = CCJS_ELEMENT_LIST_STRUCTURE;

})();
