(function() {

    CCJS.addPlugin('add-image-data', function() {
        var me = this,
            dataImages = [];

        if (! me.pluginVitalData['imagesLoaderPlugin_images']) {
            me.pluginVitalData['imagesLoaderPlugin_images'] = [];
        }

        for(var i =0,ilp = me.pluginVitalData['imagesLoaderPlugin_images'],ilpLn = ilp.length;i<ilpLn;i++ )
        {
            dataImages.push (
                '<div data-button="" data-icon="" data-add-as="background" data-image-index="'+i+'"'+
                'style="background-image:url(\''+ilp[i]+'\')">'+me.language['image-add-as-background']+'</div>'
            );
            dataImages.push (
                '<div data-button="" data-icon="" data-add-as="src" data-image-index="'+i+'"'+
                'style="background-image:url(\''+ilp[i]+'\')">'+me.language['image-add-as-src']+'</div>'
            );
        }

        me.showPopupElement([
            '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
            '<style>',
                '[data-icon] {',
                    'display:inline-block;min-width:100px !important;max-width:100px;min-height:100px !important;max-height:100px;',
                    'background-repeat:no-repeat;background-size:contain;background-position: center;',
                    'text-shadow: 0 0 1px #000;',
                    'color: #f0f',
                '}',
            '</style>',
            '<div data-content="">',
                '<div style="width: 100%; box-sizing:border-box;" data-button="">',
                    me.language['load-png-file'],
                '<input type="file" data-load-type="image/png" class="load-file-png"></div>',
                dataImages,
            '</div>'
        ].join(''),function(e){
                if (e.target.getAttribute('data-load-type')) {
                    var input = this.main_popup.element.querySelector('.load-file-png');

                    input.onchange = function () {
                        var file = this.files[0];

                        if (file) {
                            var freader = new FileReader();

                            freader.onload = function(evt) {
                                if (evt.target.readyState == FileReader.DONE) {
                                        convertImgToBase64URL(evt.target.result,function(dx) {
                                                me.pluginVitalData['imagesLoaderPlugin_images'].push(dx);
                                        },e.target.getAttribute('data-load-type'));

                                    me.refreshData();
                                }
                            };

                            freader.readAsDataURL(file.slice(0,file.size-1));

                            input = null;
                        }
                    };
                    me.main_popup.element.classList.add('hidden');
                }

                var setAs = e.target.getAttribute('data-add-as');

                if (setAs && this.currentSelectedElementNode) {
                    var index = e.target.getAttribute('data-image-index');

                    if (setAs == "background") {
                        var style = CSSMagic.parse(this.currentSelectedElementNode.getAttribute('style') || '');

                        style = CSSMagic.addStatement(style, 'background-image',"url('"+me.pluginVitalData['imagesLoaderPlugin_images'][index]+"')");

                        this.currentSelectedElementNode.setAttribute('style',CSSMagic.stringify(style));
                    }
                    if (setAs =="src") {
                        this.currentSelectedElementNode.setAttribute('src', me.pluginVitalData['imagesLoaderPlugin_images'][index]);
                    }
                    me.softRefreshData();
                    me.main_popup.element.classList.add('hidden');
                }
            },false,true);
    });
})();
