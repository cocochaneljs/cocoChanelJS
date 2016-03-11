(function() {
    // preview sizing and scaling
    window.setInterval(function() {
        var preview =  CCJS.main_preview,
            previewBox = preview.getBoundingClientRect(),
            previewParentBox = CCJS.main_previewPane.getBoundingClientRect(),
            previewWidth = preview.getAttribute('data-width'),
            previewHeight = preview.getAttribute('data-height');


        if (previewWidth && previewHeight) {
            var style = [],
                scale = 1,
                width = previewWidth,
                height = previewHeight,
                scaleX, scaleY;

            if (previewWidth  > previewParentBox.width)
                scaleX = previewParentBox.width / previewWidth;

            if (previewHeight  > previewParentBox.height)
                scaleY = previewParentBox.height / previewHeight;

            if (scaleX) {
                scale = scaleX || 1;
            }

            if (scaleX && scaleY && scaleX > scaleY){
                scale = scaleY || 1;
            }

            if (scale < 1) {
                width = width * scale;
                height = height * scale;
            }

            style.push('width:'+width+'px');
            style.push('height:'+height+'px');
            style.push('min-width:'+width+'px');
            style.push('min-height:'+height+'px');
            style.push('max-width:'+width+'px');
            style.push('max-height:'+height+'px');

            preview.setAttribute('style', style.join(';'));
            preview.setZoomFactor(scale);
            // hack for a bug with object in webview
            CCJS.main_preview.shadowRoot.childNodes[0].style.height = '100%';

        } else {
            preview.removeAttribute('style');
            preview.setZoomFactor(1);

            // hack for a bug with object in webview
            CCJS.main_preview.shadowRoot.childNodes[0].style.height = previewParentBox.height +"px";
        }
    }, 10);

    // normal view
    CCJS.addPlugin({
        title: 'mobile-simulation-normal',
        action: function(){
            this.main_preview.removeAttribute('data-width');
            this.main_preview.removeAttribute('data-height');
        },
        category: "mobile-simulation"
    });

    // flip between portrait and landscape
    CCJS.addPlugin({
        title: 'mobile-simulation-flip',
        action: function(){
            var previewWidth = this.main_preview.getAttribute('data-width'),
                previewHeight = this.main_preview.getAttribute('data-height');

            if (!previewWidth || !previewHeight)
                return;

            this.main_preview.setAttribute('data-width', previewHeight);
            this.main_preview.setAttribute('data-height', previewWidth);
        },
        category: "mobile-simulation"
    });

    CCJS.addPlugin({
        title: 'mobile-simulation-view',
        action: function() {
            var me = this,
                screenSizes = [{
                    title: 'iPhone 4S',
                    w: 320,
                    h: 480
                }, {
                    title: 'iPhone 5S',
                    w: 320,
                    h: 568
                }, {
                    title: 'iPhone 6',
                    w: 375,
                    h: 667
                }, {
                    title: 'iPhone 6S',
                    w: 414,
                    h: 736
                }, {
                    title: 'iPad',
                    w: 768,
                    h: 1024
                }, {
                    title: 'Phone',
                    w: 320,
                    h: 640
                }, {
                    title: 'Tablet',
                    w: 601,
                    h: 906
                }, {
                    title: 'Tablet',
                    w: 800,
                    h: 1200
                }],
                data = "";

            for (var i = 0, ln = screenSizes.length; i < ln; i++) {
                data += [
                    '<div data-button="true" data-view="true" data-width="',screenSizes[i].w,'" data-height="',screenSizes[i].h,'" >',
                        screenSizes[i].title,'&nbsp;(',screenSizes[i].w,',',screenSizes[i].h,')',
                    '</div>'
                ].join('');
            }

            me.showPopupElement([
                '<div data-button="" data-close-button="true">',me.translateKey('close-popup'),'</div>',
                '<div data-content="">',
                    data,
                '</div>'
            ].join(''),function(e){
                var target = e.getTarget('[data-button][data-view]',3);

                if (target) {
                    me.main_preview.setAttribute('data-width', target.getAttribute('data-width'));
                    me.main_preview.setAttribute('data-height', target.getAttribute('data-height'));
                    me.main_popup.element.classList.add('hidden');
                }
            }, me);
        },
        category: "mobile-simulation"
    });
})();
