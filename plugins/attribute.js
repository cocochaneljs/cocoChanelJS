(function() {
    CCJS.addPlugin('add-attribute',function(){
        if(!this.currentSelectedElementNode)
            return;
        var attribute = prompt(this.language['add-attribute-name-prompt'],''),
            value = prompt(this.language['add-attribute-value-prompt'],'');

        if (!attribute || !value)
            return;

        this.currentSelectedElementNode.setAttribute(attribute, value);
        this.softRefreshData();
    }, true, true);
})();
