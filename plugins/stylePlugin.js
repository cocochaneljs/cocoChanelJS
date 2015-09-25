(function() {
    CCJS.addPlugin('general-styling', function() {
        var me = this,
            style = this.pluginVitalData.stylePlugin_style;

        if (!style)
            style = this.root_document.querySelector('[data-general-styling]');

        me.showPopupElement([
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
            styling = CSS_BREAK(this.currentSelectedElementNode.getAttribute('style') || ''),
            stylingTemplate = [],
            template;

        delete styling[''];

        for (var i = 0,styleOptions = window['STARTER_KIT_STYLE_OPTIONS'],ln = styleOptions.length; i< ln; i++) {
            var options =[];
            for (var u =0,optionsArr = styleOptions[i].options,optionsLn = optionsArr.length; u < optionsLn; u++) {
                options.push(
                    '<div data-button="" data-option-value="',
                        optionsArr[u],
                    '">',
                        optionsArr[u],
                    '</div>'
                );
            }
            options.push(
                '<div data-button="" data-option-value="remove-value">',
                this.language['style-option-remove'],
                '</div>'
            );
            stylingTemplate.push(
                '<div class="flex-one" data-button="" data-option="',
                styleOptions[i].title,
                '">',
                    '<span>',
                        styleOptions[i].title,
                    ':</span>',
                    options.join(''),
                '</div>'
            );
        }

        template = [
            '<style style="display:none">',
                '[data-button][data-option] {',
                    'max-height: none !important;',
                    'flex: 0 auto !important;',
                    'width: 99%;',
                    'box-sizing:border-box;',
                    'background: inherit;',
                '}',
                '[data-button][data-option-value]:hover {',
                    'background: #edf !important;',
                '}',
                '[data-button][data-option-value][data-selected] {',
                    'background: #99f !important;',
                '}',
            '</style>',
            '<div class="column" data-content="">',
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
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

                    styling[statementTitleCurrent] = statementValueCurrent;
                }
                for (var key in styling) {
                    if (styling[key] && styling[key]!="remove-value")
                        compiledCSS +=key +':'+ styling[key]+';';
                }
                this.currentSelectedElementNode.setAttribute('style',compiledCSS);
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

            buttonToSelect[k].querySelector('[data-option-value="'+styling[stylingTitle]+'"]').setAttribute('data-selected','true');
        }
    }, true);

})();
