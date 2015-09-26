(function() {
    CCJS.addPlugin('general-styling', function() {
        var me = this,
            style = this.pluginVitalData.stylePlugin_style;

        if (!style)
            style = this.root_document.querySelector('[data-general-styling]');

        me.showPopupElement([
            '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
            '<textarea wrap="off" placeholder="',
                this.language['general-styling-placeholder'],
            '" style="width:100%;height:100%">',
            style ? style.innerText : '',
            '</textarea>'
        ].join(''),function(e){
            if (e.target.nodeName == "TEXTAREA")
                return;


            if (!style)
                style = this.root_document.createElement('style');

            var css = this.main_popup.element.querySelector('textarea').value;

            css = css.replace(/<br.*?>/g, '');
            style.innerHTML = css;
            style.setAttribute(this.untoucheableNodes, 'true');
            style.setAttribute('data-general-styling','true');

            this.pluginVitalData.stylePlugin_style = style;

            this.root_head.appendChild(style);

            this.softRefreshData();
            this.main_popup.element.classList.add('hidden');
        }, false, true);

    }, true);

    CCJS.addPlugin('element-styling',function() {
        if (!this.currentSelectedElementNode || this.currentSelectedElementNode.getAttribute(this.unstyleableNodes)) {
            alert(this.language['style-cannot-be-styled']);
            return;
        }

        var me = this,
            styleOptions = window['STARTER_KIT_STYLE_OPTIONS'].sort(function(a,b) {
                    return a.category.localeCompare(b.category);
            }),
            styling = CSSMagic.parse(this.currentSelectedElementNode.getAttribute('style') || ''),
            stylingTemplate = [],
            template;


        for (var i = 0,ln = styleOptions.length; i< ln; i++) {
            var options =[];
            for (var u =0,optionsArr = styleOptions[i].options,optionsLn = optionsArr.length; u < optionsLn; u++) {
                if (optionsArr[u].indexOf("#") == -1) {
                    options.push(
                        '<div data-button="" data-option-value="',
                            optionsArr[u],
                        '">',
                            optionsArr[u],
                        '</div>'
                    );
                } else {
                    var type = optionsArr[u].replace('#','');

                    if (!type)
                        type = "text";

                    options.push(
                        '<textarea wrap="off" spellcheck="false" class="input-option" placeholder="',
                            this.language['custom-style-placeholder'],
                        '" data-button="" type="', type, '" data-custom-value="" data-option-value="',
                            optionsArr[u],
                        '"></textarea>'
                    );
                }
            }
            options.push(
                '<div data-button="" data-option-value="remove-value">',
                this.language['style-option-remove'],
                '</div>'
            );
            stylingTemplate.push(
                '<div class="block" data-custom-value="" data-option="',
                styleOptions[i].title,
                '">',
                    '<span data-option-label="">',
                        styleOptions[i].title,
                    '</span>',
                    options.join(''),
                '</div>'
            );
        }

        template = [
            '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
            '<div class="block" style="" data-content="">',
                stylingTemplate.join(''),
            '</div>'
        ];

        me.showPopupElement(template.join(''),function(e){
            if (e.target.getAttribute('data-close-button')) {
                var selectedOptions = this.main_popup.element.querySelectorAll('[data-selected]'),
                    compiledCSS = "";

                for (var i = 0; i < selectedOptions.length; i ++) {
                    var statementTitleCurrent = selectedOptions[i].parentNode.getAttribute('data-option'),
                        statementValueCurrent = selectedOptions[i].getAttribute('data-option-value');

                    if (statementValueCurrent.indexOf('#') == -1)
                        CSSMagic.addStatement(styling, statementTitleCurrent, statementValueCurrent);
                    else
                        CSSMagic.addStatement(styling, statementTitleCurrent, selectedOptions[i].value);
                }
                for (var key in styling) {
                    if (styling[key] == "remove-value")
                        styling = CSSMagic.addStatement(styling, key, '');
                }

                this.currentSelectedElementNode.setAttribute('style',CSSMagic.stringify(styling));
                this.main_popup.element.classList.add('hidden');
                this.softRefreshData();
                return;
            }

            var optionValue = e.target.getAttribute('data-option-value');

            if (! optionValue)
                return;

            var selectedElements = e.target.parentNode.querySelectorAll('[data-selected]');

            for (var i = 0; i< selectedElements.length; i++) {
                selectedElements[i].removeAttribute('data-selected');
            }

            e.target.setAttribute('data-selected','true');
        }, false, true);

        var buttonToSelect = this.main_popup.element.querySelectorAll('[data-option]');

        for (var k = 0; k <buttonToSelect.length;k++) {
            var stylingTitle =buttonToSelect[k].getAttribute('data-option');

            if (! styling[stylingTitle])
                continue;

            var selection = buttonToSelect[k].querySelector('[data-option-value="'+styling[stylingTitle]+'"]');

            if (selection)
                selection.setAttribute('data-selected','true');
            else {
                var custom = buttonToSelect[k].querySelector('[data-custom-value]');

                if (custom) {
                    custom.value = styling[stylingTitle];
                    custom.setAttribute('data-selected','true');
                }
            }
        }
    }, true);

})();
