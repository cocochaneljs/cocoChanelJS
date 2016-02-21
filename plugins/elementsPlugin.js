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
            '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
            '<div data-content="">',
                data,
            '</div>'
        ].join(''),function(e){
            if (e.target.getAttribute('data-type'))
                this.addElement(e.target.getAttribute('data-type'));
        }, me);

    }, true, true);

    CCJS.addPlugin('duplicate-element', function(){
        if(this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.nodeName) != -1)
            return;

        var currentElement = this.currentSelectedElementNode,
            element = this.addElement(currentElement.nodeName);

        for (var i = 0, ln = currentElement.attributes.length; i < ln; i++)
            if (currentElement.attributes[i].name != this.uniqueIdAttribute)
                element.setAttribute(currentElement.attributes[i].name, currentElement.attributes[i].value);

        element.id = currentElement.id + CCJS.root_document.querySelectorAll('[id*="'+currentElement.id+'"]').length;
        currentElement.parentNode.appendChild(element);

        element.innerHTML = currentElement.innerHTML;

        var subElements = element.querySelectorAll('*');

        for (var k = 0,lnk = subElements.length; k < lnk; k++)
            subElements[k].removeAttribute('data-ccjs-element');

        this.softRefreshData();
    }, true, true);

    CCJS.addPlugin('delete-element',function(){
        this.removeElement();
    }, true, true);

    CCJS.addPlugin('dom-order-up',function(){
        if(! this.currentSelectedElementNode.previousSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode, this.currentSelectedElementNode.previousSibling);
        this.softRefreshData();
    }, true, true);

    CCJS.addPlugin('dom-order-down',function(){
        if(! this.currentSelectedElementNode.nextSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode.nextSibling, this.currentSelectedElementNode);
        this.softRefreshData();
    }, true, true);

    CCJS.addPlugin('dom-move-up',function(){
        if (this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.parentNode.nodeName) != -1)
            return;

        this.currentSelectedElementNode.parentNode.parentNode.appendChild(this.currentSelectedElementNode);
        this.softRefreshData();
    }, true, true);

    CCJS.addPlugin('dom-move-down',function(){
        var elementsFromParent = this.currentSelectedElementNode.parentNode.children,
            filteredElements = [];
            dataShow =[],
            elementsString = "",
            me = this;

        for (var i = 0; i < elementsFromParent.length; i++) {
            if (elementsFromParent[i] === this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(elementsFromParent[i].nodeName) > -1)
                continue;

            filteredElements.push(elementsFromParent[i]);
        }

        elementsString += this.getAllElementsAsList(filteredElements);

        dataShow = [
            '<style>',
            '.element-selection-button {',
                'flex-direction: row !important;',
                'display: flex !important;',
            '}',
            '.element-selection-button .flex {',
                'display: flex !important;',
            '}',
            '</style>',
            '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
            '<div data-content="">',
                elementsString,
            '</div>'
        ];

        me.showPopupElement(dataShow.join(''),function(e){
            if (e.target.getAttribute('data-selector')) {
                var element = this.selectSpecificElement(e.target.getAttribute('data-selector'));

                if (element)
                    element.appendChild(this.currentSelectedElementNode);

                this.refreshData();
            }
        });
    }, true, true);
})();
