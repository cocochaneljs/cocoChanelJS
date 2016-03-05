( function() {
function CocoChanelJS() {
    this.language = LMInstance.getLanguage();
    this.uniqueIdAttribute = 'data-ccjs-element';
    this.nonRemovableNodes = ['HTML','HEAD','BODY','data-storage-element'];
    this.untoucheableNodes = 'data-not-touch';
    this.unstyleableNodes ='data-not-style';
    this.keywords = {
        collapsed: 'data-element-list-collapsed'
    };
    this.hilighter = {
        selectedElementAttribute: 'data-ccjs-selected',
        selectedElementStyle: 'data-ccjs-hilighter',
        selectedStyleElement: null,
    };
    this.delayReload = 0;

    this.initializeElements();

    this.main_popup = {};
    this.elementCounter = 0;
    this.root_document = null;
    this.root_document_html = null;
    this.root_body = null;
    this.root_head = null;
    this.root_document_data_storage = null;
    this.root_injection_script = null;
    this.currentSelectedElement = null;
    this.currentSelectedElementNode = null;
    this.plugins = [];

    this.initialize();

    // this data will be stored with the html file
    this.pluginVitalData = {};

    // this data will be only during runtime
    this.liveData = {};
}

CocoChanelJS.prototype.test = function (first_argument) {
    console.log([first_argument,this]);
};

CocoChanelJS.prototype.initializeElements = function() {
    this.main_body_element = document.createElement('div');
    this.main_body_element.className = "flex column fullSpace";
    this.main_body_element.innerHTML = [
        '<div class="mainPane flex column flex-one">',
            '<div class="optionsPane flex row">',
            '</div>',
            '<div class="bodyPane flex row flex-one">',
                '<div class="propertiesPane fastPane flex column">',
                '</div>',
                '<div class="previewPane flex-one flex column">',
                    '<webview class="main_scenePreview flex-one" disablewebsecurity nodeintegration></webview>',
                '</div>',
                '<div class="propertiesPane flex column">',
                    '<div class="main_sceneSelector flex-one flex column">',
                    '</div>',
                    '<div class="main_attributesSection flex-one flex column">',
                    '</div>',
                    '<div class="main_extrasSection flex-one flex row">',
                        '<div class="main_loading_state">',
                            '<div id="loading-marker-animation-state">',
                                '<div>',
                                    '<div>',
                                        '<div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</div>',
                        '<div class="console-outcast"></div>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');

    this.main_previewPane = this.main_body_element.querySelector('.previewPane');
    this.main_preview = this.main_body_element.querySelector('.main_scenePreview');
    this.main_elementSelector = this.main_body_element.querySelector('.main_sceneSelector');
    this.main_elementAttributes = this.main_body_element.querySelector('.main_attributesSection');
    this.main_elementExtras = this.main_body_element.querySelector('.main_extrasSection');
    this.main_options = this.main_body_element.querySelector('.optionsPane');
    this.main_fastOptions = this.main_body_element.querySelector('.fastPane');

    document.body.appendChild(this.main_body_element);
};


CocoChanelJS.prototype.initialize = function() {
    // origin lie
    document.origin = 'https://github.com/rokyed/cocoChanelJS.git';

    var me = this;

    this.createPopupElement();
    this.implementDocument();
    this.initializeEventListeners();
    this.clearSelection();
    this.refreshData();


};

CocoChanelJS.prototype.clearSelection = function() {
    this.currentSelectedElement = null;
    this.currentSelectedElementNode =null;
};
CocoChanelJS.prototype.onPreviewElementClicked = function(e) {
    this.setCurrentSelectedElement(e[2],e[1]);

    this.propagateRemoveAttribute(this.currentSelectedElementNode, this.keywords.collapsed);

    this.softRefreshData();
};
CocoChanelJS.prototype.onPreviewElementHover = function(e) {
    this.setCurrentSelectedElement(e[2],e[1]);
    this.softRefreshData();
};

CocoChanelJS.prototype.onElementSelected = function(e) {
    var eTarget = e.getTarget('.element-selection-button', 10),
        collapseTarget = e.getTarget('.collapse-element'),
        collapse;

    if (! eTarget)
        return;

    if (collapseTarget) {
        collapse = collapseTarget.getAttribute(this.keywords.collapsed);

        this.collapseSpecificElement(
            eTarget.getAttribute('data-selector'),
            eTarget.getAttribute('data-type'),
            (! collapse)
        );
        this.refreshData();
        return;
    }

    if (eTarget.getAttribute(this.untoucheableNodes)) {
        this.refreshData();
        return;
    }

    this.setCurrentSelectedElement(
        eTarget.getAttribute('data-selector'),
        eTarget.getAttribute('data-type')
    );

    this.softRefreshData();
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

CocoChanelJS.prototype.collapseSpecificElement = function(dataSelector, dataType, collapse) {
    var element = this.getSpecificElement(dataSelector, dataType);;

    if (element) {
        if (collapse) {
            element.setAttribute(this.keywords.collapsed, 'true');
        } else {
            element.removeAttribute(this.keywords.collapsed);
        }
    }
};

CocoChanelJS.prototype.setCurrentSelectedElement = function(dataSelector, dataType, id) {
    this.currentSelectedElement = {
        dataSelector: dataSelector,
        dataType: dataType,
        id: id
    };

    this.currentSelectedElementNode = this.getSpecificElement(dataSelector, dataType);
};

CocoChanelJS.prototype.getSpecificElement = function (dataSelector, dataType) {
    if (dataSelector) {
        console.log('grabbed with dataSelector:', dataSelector);

        return this.selectSpecificElement(dataSelector)
    }

    console.log('grabbed with dataType:', dataType);

    return this.selectSpecificElement(false, dataType);
};

CocoChanelJS.prototype.selectSpecificElement = function(attrib, selector) {
    if (attrib)
        return this.root_document.querySelector('[' + this.uniqueIdAttribute + '="' + attrib + '"]');

    return this.root_document.querySelector(selector);
};

CocoChanelJS.prototype.implementDocument = function(skipDocumentCreation) {
    if (!skipDocumentCreation)
        this.root_document = document.implementation.createHTMLDocument();

    this.root_document_html = this.root_document.querySelector('html');
    this.root_body = this.root_document.body;

    if (!this.root_body.getAttribute('style'))
        this.root_body.setAttribute('style','');

    if (!this.root_body.getAttribute('class'))
        this.root_body.setAttribute('class','');

    this.root_head = this.root_document.head;

    if (!this.root_head.getAttribute(this.unstyleableNodes))
        this.root_head.setAttribute(this.unstyleableNodes,'true');

    if (!this.root_document_html.getAttribute(this.unstyleableNodes))
        this.root_document_html.setAttribute(this.unstyleableNodes,'true');

    this.root_document_data_storage = this.root_document.querySelector('[data-storage-element]');

    if (!this.root_document_data_storage) {
        this.root_document_data_storage = this.root_document.createElement('script');
        this.root_document_data_storage.setAttribute('data-storage-element','true')
        this.root_document_data_storage.setAttribute(this.untoucheableNodes,'true');
        this.root_document_data_storage.setAttribute('type','application/json');
        this.root_document_data_storage.setAttribute('style','display:none');
        this.root_document_data_storage.setAttribute(this.uniqueIdAttribute,this.generateUniqueId());
        this.root_document_data_storage.id = 'DATA_STORAGE';
        this.root_head.appendChild(this.root_document_data_storage);
    }

    if (this.root_document.querySelector('script['+this.untoucheableNodes+'][data-event-injection-script]'))
        return;
    var script = this.root_document.createElement('script');

    script.setAttribute('type','text/javascript');
    script.id = "EVENT_INJECT";
    script.setAttribute(this.untoucheableNodes,'true');
    script.setAttribute('data-event-injection-script','true')
    script.innerHTML = CCJS_GEN_INJECTION_JS(this.uniqueIdAttribute);
    this.root_injection_script = script;
    this.root_head.appendChild(script);
};

CocoChanelJS.prototype.listAllElements = function() {
    this.main_elementSelector.innerHTML = this.getAllElementsAsList();
};

CocoChanelJS.prototype.getAllElements = function(withSelector) {
    var tree = this.reccursiveTreeExplore(this.root_document_html,1);

    return window['underscorejs'].flatten(tree);
};

CocoChanelJS.prototype.propagateRemoveAttribute = function(element, attribute) {
    if (element.parentNode)
        this.propagateRemoveAttribute(element.parentNode, attribute);

    if (element.removeAttribute)
        element.removeAttribute(attribute);
};

CocoChanelJS.prototype.reccursiveTreeExplore = function(element, depth) {
    var arr = [{
        uniqueID: element.getAttribute ? element.getAttribute(this.uniqueIdAttribute) :'',
        nodeName: element.nodeName,
        nodeClass: element.className,
        nodeID: element.id,
        nodeDepth: depth,
        collapsed: element.getAttribute ? (element.getAttribute(this.keywords.collapsed) ? true : false): false,
        isUntoucheable: element.getAttribute ? (element.getAttribute(this.untoucheableNodes) ? true: false) : false
    }];

    if (element.children.length == 0 || element.getAttribute && element.getAttribute(this.keywords.collapsed))
        return arr;

    for (var i = 0,ln = element.children.length; i< ln;i++)
        arr.push(this.reccursiveTreeExplore(element.children[i], depth + 1));

    return arr;
};

CocoChanelJS.prototype.getAllElementsAsList = function(elements) {
    elements = elements || this.getAllElements();
    var str ='';

    //@TODO to be refactored with a template for greater flexibility

    for (var i = 0, ln = elements.length; i<ln;i++) {
        str+= CCJS_ELEMENT_LIST_STRUCTURE({
            extraDATA: 'data-button',
            id: elements[i].nodeID,
            className: elements[i].nodeClass,
            dataType: elements[i].nodeName,
            collapsed: elements[i].collapsed,
            isUntoucheable: elements[i].isUntoucheable,
            untoucheable: this.untoucheableNodes,
            dataSelector: elements[i].uniqueID,
            treeDepth: elements[i].nodeDepth
        });
    }

    return str;
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
            attributes +=['<div><label>',
                this.currentSelectedElementNode.attributes[i].name,
            ':</label><input data-attribute-data="',
            this.currentSelectedElementNode.attributes[i].name,
            '" type="text" value="',
                this.currentSelectedElementNode.attributes[i].value,
            '"></div>'].join('');
        }
    }else {
        attributes = "<div class='alert'>"+this.language['nothing_selected']+"</div>";
    }

    this.main_elementAttributes.innerHTML = attributes;
};

CocoChanelJS.prototype.addElement = function(type) {
    var element = this.root_document.createElement(type);

    element.setAttribute(this.uniqueIdAttribute,this.generateUniqueId());
    element.setAttribute('style','');
    element.setAttribute('class','');

    if (this.currentSelectedElementNode)
        this.currentSelectedElementNode.appendChild(element);

    this.softRefreshData();

    return element;
};

CocoChanelJS.prototype.removeElement = function() {
    if (! this.currentSelectedElementNode)
        return;

    if (this.nonRemovableNodes.indexOf(this.currentSelectedElementNode.nodeName.toUpperCase()) > -1)
        return;

    this.currentSelectedElementNode.remove();
    this.refreshData();
};

// creates plugins that give access to the core, so we could add stuff to the core without modifying the whole core.
CocoChanelJS.prototype.addPlugin = function(title, action, fastPane, checkForSelected) {
    var me = this,
        plugin = document.createElement('div');

    plugin.innerHTML = this.language[title] || title;
    plugin.classList.add('plugin-button');
    plugin.setAttribute('data-plugin-requires-selection', checkForSelected ? 'true': 'false');

    EventListenerWrapper.addEventListener(plugin,
        'click',
        function() {
            if (checkForSelected) {
                if(me.currentSelectedElementNode){
                    action.apply(me, arguments);
                }else{
                    me.refreshData();
                    window.alert(me.language['element-selected-is-required']);
                }
            } else {
                action.apply(me, arguments);
            }
        },
        me,
        false
    );

    if (fastPane) {
        if (typeof fastPane === "string") {
            this.addToCategory(plugin, fastPane);
        } else {
            this.main_fastOptions.appendChild(plugin);
        }
    } else {
        this.main_options.appendChild(plugin);
    }
};

CocoChanelJS.prototype.addCategory = function(categoryName) {
    var me = this,
        catergoryElement = me.main_fastOptions.querySelector('[data-category-name="'+categoryName+'"]'),
        categoryTitle,
        categoryInner;

    if (catergoryElement)
        return catergoryElement.querySelector('.plugin-category-inner');

    categoryElement = document.createElement('div');
    categoryElement.setAttribute('data-category-name', categoryName);
    categoryTitle = document.createElement('div');
    categoryInner = document.createElement('div');
    categoryElement.className = "plugin-category";
    categoryTitle.className = "plugin-category-title";
    categoryInner.className = "plugin-category-inner";
    categoryTitle.innerHTML = this.language[categoryName] || categoryName;
    categoryElement.appendChild(categoryTitle);
    categoryElement.appendChild(categoryInner);

    EventListenerWrapper.addEventListener(categoryTitle,'click',function () {
        if (categoryInner.classList.contains('hidden'))
            categoryInner.classList.remove('hidden');
        else
            categoryInner.classList.add('hidden');
    }, this);

    me.main_fastOptions.appendChild(categoryElement);

    return categoryElement.querySelector('.plugin-category-inner');
};

CocoChanelJS.prototype.addToCategory = function(element, categoryName) {
    var categoryInner = this.addCategory(categoryName);

    categoryInner.appendChild(element);
};

CocoChanelJS.prototype.showPreview = function() {
    var me = this;

    //takes all the root_document and spews it out as a string
    this.main_preview.src = '';
    this.main_body_element.parentNode.setAttribute('data-preview-loading','true');

    this.___REFRESH_TIMER___ = window.setTimeout(function() {
        me.main_preview.src = 'data:text/html;charset=utf-8,' + encodeURI(me.root_document.documentElement.innerHTML);
        //me.main_preview.contentWindow.postMessage('hi',"*");
        me.main_body_element.parentNode.removeAttribute('data-preview-loading');
    },this.delayReload);
};

CocoChanelJS.prototype.cookieBackup = function() {
    var data =  {
        html: me.root_document.documentElement.innerHTML,
        UID: this.elementCounter
    };

    document.cookie = JSON.stringify(data);
};

/**
 * generates an unique id based on the timestamp, in order to not duplicate it,
 *  it also counts all the elments containing the prefix from the timestamp.
 * @returns {String}
 */
CocoChanelJS.prototype.generateUniqueId = function() {
    var timestamp = new Date().getTime(),
        timestampStr = timestamp.toString(16).toUpperCase(),
        elements = this.getAllElements('['+this.uniqueIdAttribute+'^="'+timestampStr+'"]');

    timestampStr += '_'+ elements.length ;

    return timestampStr;
};

/**
 * it's a hard refresh , one that also removes selection
 * @returns {undefined}
 */
CocoChanelJS.prototype.refreshData = function() {
    this.currentSelectedElement = null;
    this.currentSelectedElementNode = null;
    this.softRefreshData();
};

/**
 * it's a soft refresh , does not remvoe selection
 * @returns {undefined}
 */
CocoChanelJS.prototype.softRefreshData =function() {
    this.drawSelectedElementHilighter();
    this.indexAllItems();
    this.listAllAttributes();
    this.listAllElements();
    this.showPreview();
    this.highlightSelectedElement();
    this.toggleButtons();
};

/**
 * toggles on slection, if the plugin requires selection.
 * @returns {undefined}
 */
CocoChanelJS.prototype.toggleButtons = function() {
    var elements = document.querySelectorAll('[data-plugin-requires-selection="true"]');

    if (this.currentSelectedElementNode) {
        for (var i = 0, ln = elements.length;i<ln;i++) {
            elements[i].classList.remove('plugin-disabled');
        }
    }else {
        for (var i = 0, ln = elements.length;i<ln;i++) {
            elements[i].classList.add('plugin-disabled');
        }
    }
};

/**
 * executed upon initalization creates popup which will be used during runtime
 * @returns {undefined}
 */
CocoChanelJS.prototype.createPopupElement = function() {
    var me = this,
        popup = document.createElement('div');

    popup.classList.add('popup');
    popup.classList.add('hidden');
    popup.classList.add('flex');
    popup.classList.add('wrap');
    popup.classList.add('space-around');

    this.main_popup.element = popup;

    EventListenerWrapper.addEventListener(this.main_popup.element, 'click', function() {
        me.main_popup.callback.apply(me.main_popup.scope, arguments);
        me.onPopupElementTap.apply(me, arguments);
    } ,this , false);

    document.body.appendChild(popup);
};

/**
 * executed by plugins, helps performing actions on the specific plugin
 * it already has events in order to listen for clicks
 *
 * @NOTE it is syncronized, so no need for callback after render.
 *
 * @param {String} data HTML code that will be inserted into popup, close button not included by default
 * @param {Function} callback
 * @param {Object/Context} scope
 * @param {Boolean} personalizedClose
 * @returns {undefined}
 */
CocoChanelJS.prototype.showPopupElement = function(data, callback, scope, personalizedClose) {
        this.main_popup.element.classList.remove('hidden');
        this.main_popup.callback = callback;
        this.main_popup.scope = scope || this;
        this.main_popup.element.innerHTML = data;
        this.main_popup.personalizedClose = !!personalizedClose;
};

/**
 * self explanatory, hides popup
 * @returns {undefined}
 */
CocoChanelJS.prototype.onPopupElementTap = function(e) {

    if (!this.main_popup.personalizedClose || e.target.getAttribute('data-close-button'))
        this.main_popup.element.classList.add('hidden');
};

/**
 * adds unique id to all elements from the document (skips nonRemovableNodes)
 * @returns {undefined}
 */
CocoChanelJS.prototype.indexAllItems = function() {
    this.implementDocument(true);

    var elements = this.root_document.querySelectorAll('*');

    for (var i = 0, ln = elements.length; i<ln;i++) {
        if (this.nonRemovableNodes.indexOf(elements[i].nodeName) === -1) {
            if (!elements[i].getAttribute(this.uniqueIdAttribute)) {
                elements[i].setAttribute(this.uniqueIdAttribute, this.generateUniqueId());
            }
            if (! elements[i].getAttribute('class'))
                elements[i].setAttribute('class', '');

            if (! elements[i].getAttribute('id'))
                elements[i].setAttribute('id', '');
        }
    }
};

CocoChanelJS.prototype.initializeEventListeners = function() {
    var me = this;
    EventListenerWrapper.addEventListener(
        this.main_elementSelector,
        'click',
        this.onElementSelected,
        this,
        false
    );

    EventListenerWrapper.addEventListener(
        this.main_elementAttributes,
        'change',
        this.onElementAttributesChanged,
        this,
        false
    );

    //  @TODO event linkage for iframe not working yet
    EventListenerWrapper.addEventListener(
        this.main_preview,
        'console-message',
        function(evt) {
            var data;

            try {
                data = JSON.parse(evt.message);
            } catch (e) {
                me.setConsoleOutcast(['view console: "', evt.message, '"'].join(''));
            }

            if (!data)
                return;

            if(data[0] == "click")
                me.onPreviewElementClicked.apply(me, [data]);
            if(data[0] == "hover")
                me.onPreviewElementHover.apply(me, [data]);
        },
        this,
        false
    );
};

CocoChanelJS.prototype.drawSelectedElementHilighter = function() {
    var oldElements = this.root_document.querySelectorAll('['+this.hilighter.selectedElementAttribute+']');

    for(var i = 0; i< oldElements.length;i++) {
        oldElements[i].removeAttribute(this.hilighter.selectedElementAttribute);
    }

    if (this.currentSelectedElementNode)
        this.currentSelectedElementNode.setAttribute(this.hilighter.selectedElementAttribute,'true');

    if (! this.hilighter.selectedStyleElement)
        this.hilighter.selectedStyleElement = this.root_document.querySelector('['+this.hilighter.selectedElementStyle+']');

    if (! this.hilighter.selectedStyleElement) {
        var hilit = this.root_document.createElement('style');

        this.hilighter.selectedStyleElement = hilit;
        hilit.setAttribute(this.untoucheableNodes, 'true');
        hilit.setAttribute(this.hilighter.selectedElementStyle, 'true');
        hilit.id = 'SELECTION-HILIGHTER';
        hilit.innerHTML = CCJS_GEN_INJECTION_CSS('['+ this.hilighter.selectedElementAttribute+']');

        this.root_head.appendChild(hilit);
    }
};

CocoChanelJS.prototype.storeEditorDataInDocument = function() {
    this.root_document_data_storage.innerHTML = "'"+ JSON.stringify(this.pluginVitalData)+"'";
};

CocoChanelJS.prototype.loadEditorDataFromDocument = function() {
    var str = this.root_document_data_storage.innerHTML;
    this.pluginVitalData = JSON.parse(str.substring(1,str.length-1));
};

CocoChanelJS.prototype.getLoaderElement = function () {
    return this.main_elementExtras.querySelector('.main_loading_state');
};

CocoChanelJS.prototype.setConsoleOutcast = function(message) {
    this.main_elementExtras.querySelector('.console-outcast').innerHTML = message;
};

module.exports = CocoChanelJS;
})();
