(function() {
    CCJS.addPlugin({
        title: 'add-attribute',
        action: function(){
            var template = [
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="" class="column">',
                    '<input class="input-option" data-option type="text" placeholder="',
                        this.language['add-attribute-name-prompt'],
                    '" name="attributeName">',
                    '<textarea class="input-option" data-option placeholder="',
                        this.language['add-attribute-value-prompt'],
                    '" name="attributeValue"></textarea>',
                '</div>'
            ],
            me = this;

            me.showPopupElement(template.join(''), function(evt) {
                if (evt.target.getAttribute('data-close-button')) {
                    var attribute = me.main_popup.element.querySelector('[name="attributeName"]').value,
                        value = me.main_popup.element.querySelector('[name="attributeValue"]').value;

                    if (!attribute || !value)
                        return;

                    me.currentSelectedElementNode.setAttribute(attribute, value);
                    me.softRefreshData();
                }
            }, me, true);
        },
        category: "element-settings"
    });
})();
