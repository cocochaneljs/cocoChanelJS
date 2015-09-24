(function() {
    CCJS.addPlugin('\u20de Add +',function(){
        var me = this;
        me.showPopupElement([
            '<div data-content="">',
            '<div data-button="" data-type="div">[DIV]</div>',
            '<div data-button="" data-type="a">[A]</div>',
            '<div data-button="" data-type="p">[P]</div>',
            '<div data-button="" data-type="link">[Link]</div>',
            '<div data-button="" data-type="b">[B]</div>',
            '<div data-button="" data-type="span">[SPAN]</div>',
            '</div'
        ].join(''),function(e){
            if (e.target.getAttribute('data-type'))
                this.addElement(e.target.getAttribute('data-type'));
        }, me);

    }, true);
    CCJS.addPlugin('\u20de Delete',function(){
        this.removeElement();
    }, true);

    CCJS.addPlugin('\u20de Order \uffea',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.previousSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode, this.currentSelectedElementNode.previousSibling);
        this.softRefreshData();
    }, true);

    CCJS.addPlugin('\u20de Order \uffec',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.nextSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode.nextSibling, this.currentSelectedElementNode);
        this.softRefreshData();
    }, true);
    CCJS.addPlugin('\u20de Move \uffea',function(){
        if (!this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.parentNode) > -1)
            return;

        this.currentSelectedElementNode.parentNode.parentNode.appendChild(this.currentSelectedElementNode);
        this.softRefreshData();
    }, true);
    CCJS.addPlugin('\u20de Move \uffec',function(){
        var elementsFromParent = this.currentSelectedElementNode.parentNode.children,
            dataShow =[],
            me = this;

        for (var i = 0; i < elementsFromParent.length; i++) {
            if (elementsFromParent[i] === this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(elementsFromParent[i].nodeName) > -1)
                continue;
            dataShow.push([
                '<div ',
                this.uniqueIdAttribute,
                '="',
                elementsFromParent[i].getAttribute(this.uniqueIdAttribute),
                '">',
                elementsFromParent[i].nodeName,
                ' ',
                elementsFromParent[i].getAttribute(this.uniqueIdAttribute),
                '</div>'
            ].join(''));
        }

        me.showPopupElement(dataShow,function(e){
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
