(function() {
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

    CCJS.addPlugin('\u20de Add +',function(){
        var me = this,
            data = [];

        for (var item in window['STARTER_KIT_TEMPLATES']) {
            data.push(

            );
        }

        me.showPopupElement(data.join(''),function(e){
            if (e.target.getAttribute('data-type'))
                this.addElement(e.target.getAttribute('data-type'));
        }, me);

    }, true);

})();