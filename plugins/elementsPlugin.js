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

        this.softRefreshData();
    }, true, true);
    CCJS.addPlugin('delete-element',function(){
        this.removeElement();
    }, true, true);

    CCJS.addPlugin('dom-order-up',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.previousSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode, this.currentSelectedElementNode.previousSibling);
        this.softRefreshData();
    }, true, true);

    CCJS.addPlugin('dom-order-down',function(){
        if (!this.currentSelectedElementNode)
            return;

        if(! this.currentSelectedElementNode.nextSibling || ! this.currentSelectedElementNode.parentNode)
            return;

        this.currentSelectedElementNode.parentNode.insertBefore(this.currentSelectedElementNode.nextSibling, this.currentSelectedElementNode);
        this.softRefreshData();
    }, true, true);
    CCJS.addPlugin('dom-move-up',function(){
        if (!this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.parentNode.nodeName) != -1)
            return;

        this.currentSelectedElementNode.parentNode.parentNode.appendChild(this.currentSelectedElementNode);
        this.softRefreshData();
    }, true, true);
    CCJS.addPlugin('dom-move-down',function(){
        var elementsFromParent = this.currentSelectedElementNode.parentNode.children,
            dataShow =[],
            elementsString ="",
            me = this;

        for (var i = 0; i < elementsFromParent.length; i++) {
            if (elementsFromParent[i] === this.currentSelectedElementNode || this.nonRemovableNodes.indexOf(elementsFromParent[i].nodeName) > -1)
                continue;
            elementsString += [
                '<div class="element-selection-button" data-button="" ',
                this.uniqueIdAttribute,
                '="',
                elementsFromParent[i].getAttribute(this.uniqueIdAttribute),
                '">',
                    '<div class="flex column">',
                        '<sup class="element-tiny-info class-listing">',
                            elementsFromParent[i].getAttribute('class'),
                        '</sup>',
                        '<sub class="element-tiny-info id-listing">',
                            elementsFromParent[i].id,
                        '</sub>',
                    '</div>',
                    '<div class="flex column">',
                        '<sup class="element-tiny-info">',
                            elementsFromParent[i].nodeName,
                        '</sup>',
                        '<sub class="element-tiny-info">',
                            elementsFromParent[i].getAttribute(this.uniqueIdAttribute),
                        '</sub>',
                    '</div>',
                '</div>'
            ].join('');
        }

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
            if (e.target.getAttribute(this.uniqueIdAttribute)) {
                var element = this.selectSpecificElement(e.target.getAttribute(this.uniqueIdAttribute));

                if (element)
                    element.appendChild(this.currentSelectedElementNode);

                this.softRefreshData();
            }
        });
    }, true, true);
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
    CCJS.addPlugin('innerHTML', function(){
        if(!this.currentSelectedElementNode)
            return;

            this.showPopupElement([
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<textarea wrap="on" spellcheck="false" placeholder="',
                    this.language['write-innerhtml-placeholder'],
                '" style="width:100%;height:100%">',
                this.currentSelectedElementNode.innerHTML,
                '</textarea>'
            ].join(''),function(e){
                if (e.target.nodeName == "TEXTAREA")
                    return;

                this.currentSelectedElementNode.innerHTML = this.main_popup.element.querySelector('textarea').value;

                this.softRefreshData();
            }, false, true);
    }, true, true);
})();
