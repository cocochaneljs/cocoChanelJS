(function() {
    CCJS.addPlugin('file',function(){
        var me = this,
            style = this.root_document.querySelector('style');

        me.refreshData();

        me.showPopupElement([
            '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
            '<div data-content="">',
                '<div data-button="" class="new-file">',
                    me.language['new-design'],
                '</div>',
                '<div data-button="" class="save-file">',
                    me.language['save-design'],
                '</div>',
                '<div data-button="">',
                    me.language['load-design'],
                '<input type="file" class="load-file"></div>',
            '</div>'
        ].join(''),function(e){

        if (e.target.classList.contains('new-file')) {
            me.root_document.documentElement.innerHTML = '<html><head></head><body></body></html>';
            me.refreshData();
        }

        if (e.target.classList.contains('save-file')) {
                me.storeEditorDataInDocument();
                me.refreshData();

                var fileNameToSaveAs = prompt('Enter file name:\n(it will go to downloads)\n(ADD .html at the end)','file.html');

                if (! fileNameToSaveAs)
                    return;

                var textToWrite = '<html>'+ this.root_document.documentElement.innerHTML+'</html>';
                var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});

                var downloadLink = document.createElement("a");
                downloadLink.download = fileNameToSaveAs;
                downloadLink.innerHTML = "Download File";
                if (window.webkitURL != null)
                {
                    // Chrome allows the link to be clicked
                    // without actually adding it to the DOM.
                    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                }
                else
                {
                    // Firefox requires the link to be added to the DOM
                    // before it can be clicked.
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.onclick = destroyClickedElement;
                    downloadLink.style.display = "none";
                    document.body.appendChild(downloadLink);
                }

                downloadLink.click();

            var data = '<html>'+ this.root_document.documentElement.innerHTML+'</html>';
            var w=window.open();
            w.document.open();
            w.document.write(data);
            w.document.close();
            me.refreshData();
        }
        if (e.target.classList.contains('load-file')) {
            var input = this.main_popup.element.querySelector('.load-file');

            input.onchange = function () {
                var file = this.files[0];

                if (file) {
                    var freader = new FileReader();

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
    },false);

    CCJS.addPlugin('about', function(){
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
    });

    CCJS.addPlugin('hard-refresh',function(){
        this.refreshData();
    }, true);
})();
