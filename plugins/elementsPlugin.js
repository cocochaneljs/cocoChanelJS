(function() {

    CCJS.addPlugin('Add Element',function(){
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
    CCJS.addPlugin('Delete Element',function(){
        this.removeElement();
    }, true);

    CCJS.addPlugin('Move Before',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.previousSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode, this.currentSelectedElementNode.previousSibling);
        this.softRefreshData();
    }, true);

    CCJS.addPlugin('Move After',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.nextSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode.nextSibling, this.currentSelectedElementNode);
        this.softRefreshData();
    }, true);
    CCJS.addPlugin('Move Up In DOM',function(){
        if (!this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.parentNode) > -1)
            return;

        this.currentSelectedElementNode.parentNode.parentNode.appendChild(this.currentSelectedElementNode);
        this.softRefreshData();
    }, true);
    CCJS.addPlugin('Move Down In DOM',function(){
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
    CCJS.addPlugin('Add Attribute',function(){
        if(!this.currentSelectedElementNode)
            return;
        var attribute = prompt('Attribute:\n(style,class,id,type,...)',''),
            value = prompt('Value:','');

        if (!attribute || !value)
            return;

        this.currentSelectedElementNode.setAttribute(attribute, value);
        this.softRefreshData();
    }, true);
    CCJS.addPlugin('innerHTML', function(){
        if(!this.currentSelectedElementNode)
            return;
        var iHtml = prompt('NOTE: THIS OVERRIDES ANY ELEMENT IN THE INNER HTML!!\ninnerHTML:','');

        if (!iHtml)
            return;

        this.currentSelectedElementNode.innerHTML = iHtml;
        this.softRefreshData();
    }, true);

})();
