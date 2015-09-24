( function() {
function CocoChanelJS(previewElement, elementSelectorElement, elementAttributesElement, elementExtrasEelement, optionPane) {
    this.uniqueIdAttribute = 'data-ccjs-element';
    this.nonRemovableNodes = ['HTML','HEAD','BODY','STYLE'];
    this.delayReload = 300;
    this.main_preview = previewElement;
    this.main_elementSelector =elementSelectorElement;
    this.main_elementAttributes = elementAttributesElement;
    this.main_elementExtras = elementExtrasEelement;
    this.main_options = optionPane;
    this.main_popup = {};
    this.elementCounter = 0;
    this.root_document = null;
    this.root_body = null;
    this.root_head = null;
    this.currentSelectedElement = null;
    this.currentSelectedElementNode = null;
    this.plugins = [];
    this.initialize();
}

CocoChanelJS.prototype.test = function (first_argument) {
    console.log([first_argument,this]);
};

CocoChanelJS.prototype.initialize = function() {
    var me = this;

    this.createPopupElement();
    this.implementDocument();
    this.refreshData();

    this.main_elementSelector.addEventListener('click', function() {
        me.onElementSelected.apply(me,arguments);
    }, false);
    this.main_elementAttributes.addEventListener('change', function() {
        me.onElementAttributesChanged.apply(me,arguments);
    }, false);
    this.main_elementExtras.addEventListener('change', function() {
        me.onElementExtrasChanged.apply(me,arguments);
    }, false);
};

CocoChanelJS.prototype.onElementSelected = function(e) {
    var eTarget = e.target;
    this.setCurrentSelectedElement(eTarget.getAttribute('data-selector'), eTarget.getAttribute('data-type'));
    this.softRefreshData();
    console.log(['selected:',eTarget,this.currentSelectedElementNode]);
};

CocoChanelJS.prototype.onElementAttributesChanged = function() {
    if (! this.currentSelectedElementNode)
        return;

    for (var i = 0, ln = this.main_elementAttributes.children.length; i < ln; i++) {
        var inputElm = this.main_elementAttributes.children[i].querySelector('input');

        this.currentSelectedElementNode.setAttribute(inputElm.getAttribute('data-attribute-data'),inputElm.value);
    }

    this.softRefreshData();
};
CocoChanelJS.prototype.onElementExtrasChanged = function() {
    console.log('extra change!!');
};
CocoChanelJS.prototype.setCurrentSelectedElement = function(dataSelector, dataType, id) {
    this.currentSelectedElement = {
        dataSelector: dataSelector,
        dataType: dataType,
        id: id
    };


    if (this.currentSelectedElement.dataSelector){
        this.currentSelectedElementNode = this.selectSpecificElement(dataSelector);
        console.log('selected with dataSelector');

    } else if(this.currentSelectedElement.dataType){
        this.currentSelectedElementNode = this.selectSpecificElement(false, dataType);
        console.log('selected with dataType');

    }
}

CocoChanelJS.prototype.implementDocument = function(skipDocumentCreation) {
    if (!skipDocumentCreation)
        this.root_document = document.implementation.createHTMLDocument();
    this.root_body = this.root_document.body;
    this.root_body.setAttribute('style','');
    this.root_body.setAttribute('class','');
    this.root_head = this.root_document.head;


};

CocoChanelJS.prototype.listAllElements = function() {
    var elements = this.root_document.querySelectorAll('*');
    var str ='';

    //@TODO to be refactored with a template for greater flexibility

    for (var i = 0, ln = elements.length; i<ln;i++) {
        str += '<div data-selector="'

        if (elements[i].getAttribute(this.uniqueIdAttribute))
            str += elements[i].getAttribute(this.uniqueIdAttribute);

        str +='" data-type="';
        str += elements[i].nodeName;

        str +='">';

        if (elements[i].getAttribute(this.uniqueIdAttribute))
            str +=  + elements[i].getAttribute(this.uniqueIdAttribute);

        str += '<mark>'+ elements[i].id+'</mark>';
        str += '<sup>' + elements[i].nodeName + '</sup></div>';
    }
    this.main_elementSelector.innerHTML = str;
};

CocoChanelJS.prototype.highlightSelectedElement = function() {
    if (this.currentSelectedElement && (this.currentSelectedElement.dataSelector || this.currentSelectedElement.dataType)) {
        var element = this.main_elementSelector.querySelector([
            '[data-selector="',
            this.currentSelectedElement.dataSelector,
            '"]',
            '[data-type="',
            this.currentSelectedElement.dataType,
            '"]',
        ].join(''));

        if (element)
            element.classList.add('selected');
    }
}

CocoChanelJS.prototype.listAllAttributes = function() {
    var attributes = "";


    if (this.currentSelectedElementNode) {
        for (var i = 0, ln = this.currentSelectedElementNode.attributes.length; i < ln; i++) {
            if (this.currentSelectedElementNode.attributes[i].name === this.uniqueIdAttribute)
                continue;
            attributes +=['<div><label>',
                this.currentSelectedElementNode.attributes[i].name,
            ':</label><input data-attribute-data="',
            this.currentSelectedElementNode.attributes[i].name,
            '" type="text" value="',
                this.currentSelectedElementNode.attributes[i].value,
            '">'].join('');
        }
    }else {
        attributes = "<div class='alert'>!! NOTHING SELECTED</div";
    }

    this.main_elementAttributes.innerHTML = attributes;
};

CocoChanelJS.prototype.listAllExtras = function() {
    var extras = "";

    if (this.currentSelectedElementNode) {

    }else {
        extras = "<div class='alert'>!! NOTHING SELECTED</div";
    }


    this.main_elementExtras.innerHTML = extras;
};

CocoChanelJS.prototype.addElement = function(type) {
    this.elementCounter++;
    var element = this.root_document.createElement(type);

    element.setAttribute(this.uniqueIdAttribute,this.elementCounter);
    element.setAttribute('style','');
    element.setAttribute('class','');

    if (this.currentSelectedElementNode)
        this.currentSelectedElementNode.appendChild(element);

    this.softRefreshData();
};

CocoChanelJS.prototype.removeElement = function() {
    if (! this.currentSelectedElementNode)
        return;

    if (this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.nodeName.toUpperCase()) > -1)
        return;

    this.currentSelectedElementNode.remove();
    this.refreshData();
};

CocoChanelJS.prototype.selectSpecificElement = function(attrib, selector) {
    if (attrib)
        return this.root_document.querySelector('[' + this.uniqueIdAttribute + '="' + attrib + '"]');

    return this.root_document.querySelector(selector);
};

// creates plugins that give access to the core, so we could add stuff to the core without modifying the whole core.
CocoChanelJS.prototype.addPlugin = function(title, action) {
    var me = this,
        plugin = document.createElement('div');

    plugin.innerText = title;
    plugin.addEventListener('click', function() {
        action.apply(me, arguments);
    }, false);
    this.main_options.appendChild(plugin);
};

CocoChanelJS.prototype.showPreview = function() {
    var me = this;
    //takes all the root_document and spews it out as a string
    this.main_preview.src = '';
    this.___REFRESH_TIMER___ = window.setTimeout(function() {
        me.main_preview.src = 'data:text/html;charset=utf-8,' + encodeURI(me.root_document.documentElement.innerHTML);
    },this.delayReload);
};

CocoChanelJS.prototype.refreshData = function() {
    this.currentSelectedElement = null;
    this.currentSelectedElementNode = null;
    this.indexAllItems();
    this.listAllAttributes();
    this.listAllElements();
    this.listAllExtras();
    this.showPreview();
    this.highlightSelectedElement();

};

CocoChanelJS.prototype.softRefreshData =function() {
    this.listAllAttributes();
    this.listAllElements();
    this.listAllExtras();
    this.showPreview();
    this.highlightSelectedElement();
};
CocoChanelJS.prototype.createPopupElement = function() {
    var me = this,
        popup = document.createElement('div');

    popup.classList.add('popup');
    popup.classList.add('hidden');
    popup.classList.add('flex');
    popup.classList.add('wrap');
    popup.classList.add('space-around');

    this.main_popup.element = popup;
    this.main_popup.element.addEventListener('click', function() {
        me.main_popup.callback.apply(me.main_popup.scope, arguments);
        me.onPopupElementTap.apply(me, arguments);
    }, false);
    document.body.appendChild(popup);

};
CocoChanelJS.prototype.showPopupElement = function(data,callback,scope, personalizedClose) {
        this.main_popup.element.classList.remove('hidden');
        this.main_popup.callback = callback;
        this.main_popup.scope = scope || this;
        this.main_popup.element.innerHTML = data;
        this.main_popup.personalizedClose = !!personalizedClose;
};

CocoChanelJS.prototype.onPopupElementTap = function(e) {
    console.log(e.target);
    if (!this.main_popup.personalizedClose)
        this.main_popup.element.classList.add('hidden');
};

CocoChanelJS.prototype.indexAllItems = function() {
    this.implementDocument(true);

    var elements = this.root_document.querySelectorAll('*');

    for (var i = 0, ln = elements.length; i<ln;i++) {
        if (this.nonRemovableNodes.indexOf(elements[i].nodeName) === -1) {
            if (! elements[i].getAttribute(this.uniqueIdAttribute)) {
                this.elementCounter ++;
                elements[i].setAttribute(this.uniqueIdAttribute, this.elementCounter);
            }
        }
    }

};

window['CCJS'] = new CocoChanelJS(
    document.querySelector('.main_scenePreview'),
    document.querySelector('.main_sceneSelector'),
    document.querySelector('.main_attributesSection'),
    document.querySelector('.main_extrasSection'),
    document.querySelector('.optionsPane')
);
})();
