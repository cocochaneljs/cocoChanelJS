//@TODO
(function() {
    CCJS.addPlugin('positioning-form',function(){
        // grab current positioning data

        var me = this,
            template = [
                '<style>',
                    '[data-form-x] {',
                        'width: 100%;',
                        'height:500px;',
                        'position:relative;',
                    '}',
                    '[data-css-statement] {',
                        'position: absolute;',
                        'width: 100px;',
                        'border: none;',
                        'box-shadow:0 2px 2px rgba(0,0,0,0.9);',
                    '}',
                    '[data-css-statement][data-centerize] {',
                        'margin-left:-50px;',
                        'margin-right:-50px;',
                    '}',
                    '[data-css-statement][data-vertical] {',
                        'left: 50%;',
                    '}',
                    '[data-css-statement][data-horizontal] {',
                        'top: 50%;',
                    '}',
                    '[data-css-statement*="top"] {',
                        'border-radius: 0 0 5px 5px;',
                    '}',
                    '[data-css-statement*="bottom"] {',
                        'border-radius: 5px 5px 0 0;',
                    '}',
                    '[data-css-statement*="left"] {',
                        'border-radius: 0 5px 5px 0;',
                    '}',
                    '[data-css-statement*="right"] {',
                        'border-radius: 5px 0 0 5px;',
                    '}',
                    '[data-traceout]{',
                        'box-shadow:0 2px 2px rgba(0,0,0,0.9);',
                        'position:absolute;',
                    '}',
                '</style>',
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div style="position: relative;" data-content="">',
                    '<select style="position:relative;margin: 20px;" data-css-statement="position">',
                        '<option selected value="">None</option>',
                        '<option selected value="absolute">Absolute</option>',
                        '<option selected value="relative">Relative</option>',
                        '<option selected value="fixed">Fixed</option>',
                        '<option selected value="static">Static</option>',
                    '</select>',
                    '<div data-form-x>',
                    '<div data-traceout style="top:0;bottom:0;left:0;right:0;background:#FF9966;"></div>',
                    '<div data-traceout style="top:5%;bottom:5%;left:50px;right:50px;background:#E9D66B;"></div>',
                    '<div data-traceout style="top:10%;bottom:10%;left:100px;right:100px;background:#ACE1AF;"></div>',
                    '<div data-traceout style="top:15%;bottom:15%;left:150px;right:150px;background:#318CE7;"></div>',
                    '<input type="text" placeholder="width" style="margin-top:15px;" data-vertical data-horizontal data-centerize data-css-statement="width">',
                    '<input type="text" placeholder="height" style="margin-top:-15px;" data-vertical data-horizontal data-centerize data-css-statement="height">',
                    '<input type="text" placeholder="top" style="top:0" data-vertical data-centerize data-css-statement="top">',
                    '<input type="text" placeholder="left" style="left:0" data-horizontal data-css-statement="left">',
                    '<input type="text" placeholder="right" style="right:0" data-horizontal data-css-statement="right">',
                    '<input type="text" placeholder="bottom" style="bottom:0" data-centerize data-vertical data-css-statement="bottom">',
                    '<input type="text" placeholder="margin top" style="top:5%" data-centerize data-vertical data-css-statement="margin-top">',
                    '<input type="text" placeholder="margin left" style="left:50px;margin-top: 30px;" data-horizontal data-css-statement="margin-left">',
                    '<input type="text" placeholder="margin right" style="right:50px;margin-top: 30px;" data-horizontal data-css-statement="margin-right">',
                    '<input type="text" placeholder="margin bottom" style="bottom:5%" data-centerize data-vertical data-css-statement="margin-bottom">',
                    '<input type="text" placeholder="padding top" style="top:15%" data-centerize data-vertical data-css-statement="padding-top">',
                    '<input type="text" placeholder="padding left" style="left:150px;margin-top: 90px;" data-horizontal data-css-statement="padding-left">',
                    '<input type="text" placeholder="padding right" style="right:150px;margin-top: 90px;" data-horizontal data-css-statement="padding-right">',
                    '<input type="text" placeholder="padding bottom" style="bottom:15%" data-centerize data-vertical data-css-statement="padding-bottom">',
                    '<input type="text" placeholder="border top" style="top:10%" data-centerize data-vertical data-css-statement="border-top">',
                    '<input type="text" placeholder="border left" style="left:100px;margin-top: 60px;" data-horizontal data-css-statement="border-left">',
                    '<input type="text" placeholder="border right" style="right:100px;margin-top: 60px;" data-horizontal data-css-statement="border-right">',
                    '<input type="text" placeholder="border bottom" style="bottom:10%" data-centerize data-vertical data-css-statement="border-bottom">',
                    '<input type="text" placeholder="radius" style="top:10%;left:100px;" data-css-statement="border-top-left-radius">',
                    '<input type="text" placeholder="radius" style="top:10%;right:100px;"data-css-statement="border-top-right-radius">',
                    '<input type="text" placeholder="radius" style="left:100px;bottom:10%;" data-css-statement="border-bottom-left-radius">',
                    '<input type="text" placeholder="radius" style="right:100px;bottom:10%;" data-css-statement="border-bottom-right-radius">',
                    '</div>',
                '</div>'
            ];

        me.showPopupElement(template.join(''), function(evt) {

            if (evt.target.getAttribute('data-close-button')) {
                var style = CSSMagic.parse(this.currentSelectedElementNode.getAttribute('style')||''),
                    elements = me.main_popup.element.querySelectorAll('[data-css-statement]');

                for (var i = 0, ln = elements.length; i<ln; i++) {
                    if (elements[i].value)
                        CSSMagic.addStatement(style,elements[i].getAttribute('data-css-statement'),elements[i].value);
                }

                me.currentSelectedElementNode.setAttribute('style',CSSMagic.stringify(style));
                me.softRefreshData();
            }
        }, me, true);

        var style = CSSMagic.parse(this.currentSelectedElementNode.getAttribute('style')||''),
            elements = me.main_popup.element.querySelectorAll('[data-css-statement]');

        for (var i = 0, ln = elements.length; i<ln; i++) {
            elements[i].value = style[elements[i].getAttribute('data-css-statement')] || '';
        }


    }, true, true);
})();
