(function() {
    CCJS.addPlugin('table-generator',function(){
        /*
            @TODO this is main task now.
            build table generator that's easy to use and very flexible. 
            supposed to generate: the table elements and also a style element that's specially for the table
        */
        var me = this,
            template = [
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="">',
                '</div>'
            ];

        me.showPopupElement(template.join(''), function(evt) {
            if (! evt.target.getAttribute('data-close-button'))
                return;
        }, me, true);
    }, "element", true);
})();
