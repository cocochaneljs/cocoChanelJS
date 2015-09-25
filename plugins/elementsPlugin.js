(function() {

    CCJS.addPlugin('add-element',function(){
        var me = this,
            data = "",
            sortedCCJSElements = window['CCJS_ELEMENTS'].sort();

        for (var i =0; i< sortedCCJSElements.length;i++) {
            data += '<div data-button="" data-type="'+sortedCCJSElements[i];
            data +='">'+sortedCCJSElements[i]+'</div>';
        }

        me.showPopupElement([
            '<div data-content="">',
                data,
            '</div'
        ].join(''),function(e){
            if (e.target.getAttribute('data-type'))
                this.addElement(e.target.getAttribute('data-type'));
        }, me);

    }, true);
    CCJS.addPlugin('delete-element',function(){
        this.removeElement();
    }, true);

    CCJS.addPlugin('dom-order-up',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.previousSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode, this.currentSelectedElementNode.previousSibling);
        this.softRefreshData();
    }, true);

    CCJS.addPlugin('dom-order-down',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.nextSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode.nextSibling, this.currentSelectedElementNode);
        this.softRefreshData();
    }, true);
    CCJS.addPlugin('dom-move-up',function(){
        if (!this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.parentNode.nodeName) != -1)
            return;

        this.currentSelectedElementNode.parentNode.parentNode.appendChild(this.currentSelectedElementNode);
        this.softRefreshData();
    }, true);
    CCJS.addPlugin('dom-move-down',function(){
        var elementsFromParent = this.currentSelectedElementNode.parentNode.children,
            dataShow =[],
            elementsString ="",
            me = this;

        for (var i = 0; i < elementsFromParent.length; i++) {
            if (elementsFromParent[i] === this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(elementsFromParent[i].nodeName) > -1)
                continue;
            elementsString += [
                '<div data-button="" ',
                this.uniqueIdAttribute,
                '="',
                elementsFromParent[i].getAttribute(this.uniqueIdAttribute),
                '">',
                elementsFromParent[i].nodeName,
                ' ',
                elementsFromParent[i].getAttribute(this.uniqueIdAttribute),
                '</div>'
            ].join('');
        }

        dataShow = [
            '<div data-content="">',
                elementsString,
            '</div>'
        ];

        me.showPopupElement(dataShow.join(''),function(e){
            if (e.target.getAttribute(this.uniqueIdAttribute)) {
                var element = this.selectSpecificElement(e.target.getAttribute(this.uniqueIdAttribute));

                if (element)
                    element.appendChild(this.currentSelectedElementNode);

                this.softRefreshData();
            }
        }, me);
    }, true);
    CCJS.addPlugin('add-attribute',function(){
        if(!this.currentSelectedElementNode)
            return;
        var attribute = prompt(this.language['add-attribute-name-prompt'],''),
            value = prompt(this.language['add-attribute-value-prompt'],'');

        if (!attribute || !value)
            return;

        this.currentSelectedElementNode.setAttribute(attribute, value);
        this.softRefreshData();
    }, true);
    CCJS.addPlugin('innerHTML', function(){
        if(!this.currentSelectedElementNode)
            return;
        var iHtml = prompt(this.language['innerHTML-prompt'],'');

        if (!iHtml)
            return;

        this.currentSelectedElementNode.innerHTML = iHtml;
        this.softRefreshData();
    }, true);

})();
