(function() {
    CCJS.addPlugin('Hello world!',function(){
        var me = this,
            template = [
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="">',
                '</div>'
            ];

        me.showPopupElement(template.join(''), function(evt) {
            //if (!evt.target.getAttribute('data-close-button'))
        }, me, true);
    }, true, false);
})();
