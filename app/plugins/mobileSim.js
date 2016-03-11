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
        title: 'iPhone 4S (320,480)',
        action: function(){
            this.main_preview.setAttribute('data-width','320');
            this.main_preview.setAttribute('data-height','480');
            this.softRefreshData();
        },
        category: "mobile-simulation"
    });

    CCJS.addPlugin({
        title: 'iPhone 5S (320,568)',
        action: function(){
            this.main_preview.setAttribute('data-width','320');
            this.main_preview.setAttribute('data-height','568');
            this.softRefreshData();
        },
        category: "mobile-simulation"
    });

    CCJS.addPlugin({
        title: 'iPhone 6 (375,667)',
        action: function(){
            this.main_preview.setAttribute('data-width','375');
            this.main_preview.setAttribute('data-height','667');
            this.softRefreshData();
        },
        category: "mobile-simulation"
    });

    CCJS.addPlugin({
        title: 'iPhone 6+ (414,736)',
        action: function(){
            this.main_preview.setAttribute('data-width','414');
            this.main_preview.setAttribute('data-height','736');
            this.softRefreshData();
        },
        category: "mobile-simulation"
    });

    CCJS.addPlugin({
        title: 'Phone (320,640)',
        action: function(){
            this.main_preview.setAttribute('data-width','320');
            this.main_preview.setAttribute('data-height','640');
            this.softRefreshData();
        },
        category: "mobile-simulation"
    });

    CCJS.addPlugin({
        title: 'iPad (768,1024)',
        action: function(){
            this.main_preview.setAttribute('data-width','768');
            this.main_preview.setAttribute('data-height','1024');
            this.softRefreshData();
        },
        category: "mobile-simulation"
    });

    CCJS.addPlugin({
        title: 'Tablet (601,906)',
        action: function(){
            this.main_preview.setAttribute('data-width','601');
            this.main_preview.setAttribute('data-height','906');
            this.softRefreshData();
        },
        category: "mobile-simulation"
    });

    CCJS.addPlugin({
        title: 'Tablet (800,1200)',
        action: function(){
            this.main_preview.setAttribute('data-width','800');
            this.main_preview.setAttribute('data-height','1280');
            this.softRefreshData();
        },
        category: "mobile-simulation"
    });
})();
