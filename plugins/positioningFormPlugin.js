//@TODO
(function() {
    CCJS.addPlugin('positioning-form',function(){
        // grab current positioning data

        var me = this,
            template = [
                '<style>',
                '</style>',
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="">',
                '</div>'
            ];

        me.showPopupElement(template.join(''), function(evt) {
            // apply data from template

        }, me, true);


    }, true, true);
})();
