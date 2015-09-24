(function() {
    CCJS.addPlugin('\u20de Add +',function(){
        var me = this;
        me.showPopupElement([
            '<div data-type="div"    	>[         DIV         ]</div>',
            '<div data-type="a"  		>[          A          ]</div>',
            '<div data-type="p"  		>[          P          ]</div>',
        ].join(''),function(e){
            if (e.target.getAttribute('data-type'))
                this.addElement(e.target.getAttribute('data-type'));
        }, me);

    });
    CCJS.addPlugin('\u20de Delete',function(){
        this.removeElement();
    });

    CCJS.addPlugin('\u20de Order \uffea',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.previousSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode, this.currentSelectedElementNode.previousSibling);
        this.softRefreshData();
    });

    CCJS.addPlugin('\u20de Order \uffec',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.nextSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode.nextSibling, this.currentSelectedElementNode);
        this.softRefreshData();
    });
    CCJS.addPlugin('\u20de Move \uffea',function(){
        if (!this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.parentNode) > -1)
            return;

        this.currentSelectedElementNode.parentNode.parentNode.appendChild(this.currentSelectedElementNode);
        this.softRefreshData();
    });
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
    });

})();
