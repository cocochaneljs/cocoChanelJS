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

            style.push('width:'+previewWidth+'px');
            style.push('height:'+previewHeight+'px');
            style.push('min-width:'+previewWidth+'px');
            style.push('min-height:'+previewHeight+'px');

            if (scale < 1) {
                style.push('transform-origin: top left');
                style.push('transform: scale('+scale+')');

            }

            preview.setAttribute('style', style.join(';'));
            preview.setAttribute('width', previewWidth+"px");
            preview.setAttribute('height', previewHeight+"px");
            debugger;

        } else {
            preview.removeAttribute('style');
            preview.removeAttribute('width');
            preview.removeAttribute('height');

        }
    }, 16);

    // normal view
    CCJS.addPlugin({
        title: 'normal',
        action: function(){
            this.main_preview.removeAttribute('data-width');
            this.main_preview.removeAttribute('data-height');
        },
        category: "mobile-simulation"
    });

    // flip between portrait and landscape
    CCJS.addPlugin({
        title: 'flip-view',
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

    // adding screen sizes
    var screenSizes = [{
        x: 320,
        y: 480
    }];

    for (var i = 0; i < screenSizes.length; i++) {
        var strX = screenSizes[i].x,
            strY = screenSizes[i].y;

        CCJS.addPlugin({
            title: strX + ' X ' + strY,
            action: function(){
                this.main_preview.setAttribute('data-width',strX);
                this.main_preview.setAttribute('data-height',strY);
            },
            category: "mobile-simulation"
        });
    }
})();
