(function(){
    CCJS.addPlugin('add-html-at-end',function(){
        if(!this.currentSelectedElementNode)
            return;

        var template = [
            '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
            '<div data-content="" class="column">',
                '<textarea class="input-option" data-option placeholder="',
                    this.language['html'],
                '" name="htmlAtEnd"></textarea>',
            '</div>'
        ],
        me = this;

        me.showPopupElement(template.join(''), function(evt) {
            if (evt.target.getAttribute('data-close-button')) {
                var html = me.main_popup.element.querySelector('[name="htmlAtEnd"]').value;

                if (!html)
                    return;

                me.currentSelectedElementNode.innerHTML = [
                    me.currentSelectedElementNode.innerHTML,
                    html
                ].join('');
                me.softRefreshData();
            }
        }, me, true);

    }, true, false);
})();
