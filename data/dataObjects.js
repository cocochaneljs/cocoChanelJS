(function() {
    window['STARTER_KIT_STYLE_OPTIONS'] = [{
            title: 'position',
            options: [
                'absolute','fixed','relative','static','inherit','initial'
            ]
        },{
            title: 'display',
            options: [
                'block','flex','inline-block','inline','run-in','none','inherit','initial'
            ]
        },{
            title: 'flex-direction',
            options: [
                'row','column','row-reverse','column-reverse'
            ]
        },{
            title: 'flex-wrap',
            options: [
                'wrap','nowrap','wrap-reverse'
            ]
        },{
            title: 'align-items',
            options: [
                'flex-start','flex-end','center','space-around','space-between','inherit','initial'
            ]
        },{
            title: 'justify-content',
            options: [
                'flex-start','flex-end','center','space-around','space-between','inherit','initial'
            ]
        }];

    window['STARTER_KIT_TEMPLATES'] = {
        blog: [
            '<head>',
                '<style>',
                    'body {',
                        'background-color: #bada55;',
                    '}',
                '</style>',
            '</head>',
            '<body>',
            '</body>'
        ],
        shop: [
            '<html>',
            ''
        ]
    };

})();
