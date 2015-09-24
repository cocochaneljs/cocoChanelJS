(function() {
    CCJS.addPlugin('File',function(){
        var me = this,
            style = this.root_document.querySelector('style');

        me.showPopupElement([
            '<div data-content="">',
                '<div data-button="" class="new-file">New File</div>',
                '<div data-button="" class="save-file">Save File</div>',
                '<div data-button="">Load File: <input type="file" class="load-file"></div>',
            '</div>'
        ].join(''),function(e){

        if (e.target.classList.contains('new-file')) {
            me.root_document.documentElement.innerHTML = '<html><head></head><body></body></html>';
            me.refreshData();
        }

        if (e.target.classList.contains('save-file')) {
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
                        }
                    };

                    freader.readAsBinaryString(file.slice(0,file.size-1));

                    input = null;
                }
            };
        }


        }, false);
    },false);

    CCJS.addPlugin('About', function(){
        this.showPopupElement([
            '<style style="display:none">',
                '[data-content] {',
                    'align-content: flex-start;',
                    'align-items: flex-start;',
                    'justify-content: flex-start;',
                '}',
                '[data-content] [data-info] {',
                    'font-weight:500;',
                    'width: 100%',
                '}',
            '</style>',
            '<div data-content="">',
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

    CCJS.addPlugin('Refresh \u21bb',function(){
        this.refreshData();
    }, true);
})();
