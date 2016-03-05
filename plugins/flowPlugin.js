(function() {
    CCJS.addPlugin({
        title: 'file',
        tooltipDescription: 'file-description',
        action: function(){
            var me = this,
                style = this.root_document.querySelector('style');

            me.refreshData();

            if (! CCJS.liveData.flowPlugin)
                CCJS.liveData.flowPlugin = {};

            me.showPopupElement([
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="">',
                    '<div data-button="" class="new-file">',
                        me.language['new-design'],
                    '</div>',
                    '<div data-button="" class="save-file">',
                        me.language['save-design'],
                    '</div>',
                    '<div data-button="" class="save-new-file">',
                        me.language['save-new-design'],
                    '</div>',
                    '<div data-button="">',
                        me.language['load-design'],
                    '<input type="file" class="load-file"></div>',
                '</div>'
            ].join(''),function(e){

            if (e.target.classList.contains('new-file')) {
                me.root_document.documentElement.innerHTML = '<html><head></head><body></body></html>';
                me.refreshData();
                delete CCJS.liveData.flowPlugin.filePath;
            }

            if (e.target.classList.contains('save-file')) {
                me.storeEditorDataInDocument();
                me.refreshData();

                var textToWrite = '<html>'+ this.root_document.documentElement.innerHTML+'</html>',
                    options = {
                        filters: [{
                            name: "HTML",
                            extensions: ['html']
                        }]
                    };

                if (CCJS.liveData.flowPlugin.filePath)
                    window['fileSystem'].writeFile(CCJS.liveData.flowPlugin.filePath, textToWrite, function (err) {
                        if(err) console.error(err);
                    });
                else
                    window['dialog'].showSaveDialog(options, function (filePath) {
                        if (filePath) {
                            CCJS.liveData.flowPlugin.filePath = filePath;

                            window['fileSystem'].writeFile(filePath, textToWrite, function (err) {
                                if(err) console.error(err);
                            });
                        }
                    });
            }

            if (e.target.classList.contains('save-new-file')) {
                me.storeEditorDataInDocument();
                me.refreshData();

                var textToWrite = '<html>'+ this.root_document.documentElement.innerHTML+'</html>',
                    options = {
                        filters: [{
                            name: "HTML",
                            extensions: ['html']
                        }]
                    };

                window['dialog'].showSaveDialog(options, function (filePath) {
                    if (filePath) {
                        CCJS.liveData.flowPlugin.filePath = filePath;

                        window['fileSystem'].writeFile(filePath, textToWrite, function (err) {
                            if(err) console.error(err);
                        });
                    }
                });
            }

            if (e.target.classList.contains('load-file')) {
                var input = this.main_popup.element.querySelector('.load-file');

                input.onchange = function () {
                    var file = this.files[0];

                    if (file) {
                        var freader = new FileReader();

                        CCJS.liveData.flowPlugin.filePath = file.path;

                        freader.onloadend = function(evt) {
                            if (evt.target.readyState == FileReader.DONE) {
                                me.root_document.documentElement.innerHTML = evt.target.result;
                                me.refreshData();
                                me.loadEditorDataFromDocument();
                            }
                        };

                        freader.readAsBinaryString(file.slice(0,file.size-1));

                        input = null;
                    }
                };
            }

            }, false);
        },
        fastPane: false
    });

    CCJS.addPlugin({
        title: 'about',
        tooltipDescription: 'about-description',
        action: function(){
            this.showPopupElement([
                '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
                '<div data-content="" class="column">',
                    '<p data-info="">',
                    'Info:<br>',
                        '1. outline is used on selected element in order to highlight it.',
                    '</p>',
                    '<p data-info="">',
                    'Authors:<br><br>',
                        window['CCJS_AUTHORS'].join('<br>'),
                    '</p>',
                '</div>'
            ].join(''),function(e){});
        },
        fastPane: false
    });

    CCJS.addPlugin({
        title: 'hard-refresh',
        tooltipDescription: 'hard-refresh-description',
        action: function(){
            this.refreshData();
        },
        fastPane: false
    });
})();
