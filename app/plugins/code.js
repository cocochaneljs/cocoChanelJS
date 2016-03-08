(function() {
    CCJS.addPlugin({
        title: 'add-javascript',
        action: function(){
            var template = [
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="" style="position:relative;">',
                    '<div id="codemirror-editor"></div>',
                '</div>'
            ],
            me = this,
            editorTarget;

            me.showPopupElement(template.join(''), function(evt) {
                if (evt.target.getAttribute('data-close-button')) {
                    if (window['codemirrorEditor'].getValue() == "")
                        return;

                    var jsScript = me.addElement('script');
                    jsScript.setAttribute('type','text/javascript');
                    jsScript.innerHTML = window['codemirrorEditor'].getValue();
                    window['codemirrorEditor'] = null;
                    me.refreshData();
                }
            }, me, true);

            editorTarget = me.main_popup.element.querySelector('#codemirror-editor');

            window['codemirrorEditor'] = codemirror(editorTarget, {
                mode: 'javascript',
                lineNumbers: true,
                lineWrapping: true,
                extraKeys: {"Ctrl-Space": "autocomplete"},

                theme: 'monokai'
            });

        },
        category: "code"
    });

    CCJS.addPlugin({
        title: 'add-css',
        action: function(){
            var template = [
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="" style="position:relative;">',
                    '<div id="codemirror-editor"></div>',
                '</div>'
            ],
            me = this,
            editorTarget;

            me.showPopupElement(template.join(''), function(evt) {
                if (evt.target.getAttribute('data-close-button')) {
                    if (window['codemirrorEditor'].getValue() == "")
                        return;

                    var jsScript = me.addElement('style');
                    jsScript.setAttribute('type','text/css');
                    jsScript.innerHTML = window['codemirrorEditor'].getValue();
                    window['codemirrorEditor'] = null;
                    me.refreshData();
                }
            }, me, true);

            editorTarget = me.main_popup.element.querySelector('#codemirror-editor');

            window['codemirrorEditor'] = codemirror(editorTarget, {
                mode: 'css',
                lineNumbers: true,
                lineWrapping: true,
                extraKeys: {"Ctrl-Space": "autocomplete"},

                theme: 'monokai'
            });

        },
        category: "code"
    });

    CCJS.addPlugin({
        title: 'edit-inner-html',
        action: function(){
            var template = [
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="" style="position:relative;">',
                    '<div id="codemirror-editor"></div>',
                '</div>'
            ],
            me = this,
            editorTarget,
            currentType = this.currentSelectedElementNode.nodeName.toLowerCase(),
            wholeCode = this.currentSelectedElementNode.innerHTML,
            beautify_options = {
                indent_size: 4
            },
            currentMode;

            switch (currentType) {
                case 'script':
                    currentMode = 'javascript';
                    wholeCode = window['beautify_js'](wholeCode, beautify_options);
                    break;
                case 'style':
                    currentMode = 'css';
                    wholeCode = window['beautify_css'](wholeCode, beautify_options);

                    break;
                default:
                    currentMode = 'htmlmixed';
                    wholeCode = window['beautify_html'](wholeCode, beautify_options);
                    break;
            }

            me.showPopupElement(template.join(''), function(evt) {
                if (evt.target.getAttribute('data-close-button')) {
                    me.currentSelectedElementNode.innerHTML = window['codemirrorEditor'].getValue();
                    window['codemirrorEditor'] = null;
                    me.softRefreshData();
                }
            }, me, true);

            editorTarget = me.main_popup.element.querySelector('#codemirror-editor');

            window['codemirrorEditor'] = codemirror(editorTarget, {
                value: wholeCode,
                mode:  currentMode,
                lineNumbers: true,
                lineWrapping: true,
                extraKeys: {"Ctrl-Space": "autocomplete"},

                theme: 'monokai'
            });
        },
        category: "code"
    });

    CCJS.addPlugin({
        title: 'edit-style',
        action: function(){
            var template = [
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="" style="position:relative;">',
                    '<div id="codemirror-editor"></div>',
                '</div>'
            ],
            me = this,
            editorTarget,
            wholeCode = this.currentSelectedElementNode.getAttribute('style'),
            beautify_options = {
                indent_size: 4
            },
            currentMode = "css";
            wholeCode = window['beautify_css'](wholeCode, beautify_options);


            me.showPopupElement(template.join(''), function(evt) {
                if (evt.target.getAttribute('data-close-button')) {
                    me.currentSelectedElementNode.setAttribute('style',window['codemirrorEditor'].getValue());
                    window['codemirrorEditor'] = null;
                    me.softRefreshData();
                }
            }, me, true);

            editorTarget = me.main_popup.element.querySelector('#codemirror-editor');

            window['codemirrorEditor'] = codemirror(editorTarget, {
                value: wholeCode,
                mode:  currentMode,
                lineNumbers: true,
                lineWrapping: true,
                extraKeys: {"Ctrl-Space": "autocomplete"},

                theme: 'monokai'
            });
        }, category: "code"
    });
})();
