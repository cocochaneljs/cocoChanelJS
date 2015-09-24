(function() {
    CCJS.addPlugin('Style', function() {
        var me = this,
            style = this.pluginVitalData.flowPlugin_style;

        me.showPopupElement([
            '<textarea wrap="off" placeholder="Write CSS here for anything in the design ..." style="width:100%;height:100%">',
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

            this.pluginVitalData.flowPlugin_style = style;

            this.root_head.appendChild(style);

            this.softRefreshData();
            this.main_popup.element.classList.add('hidden');
        }, false, true);

    }, true);
})();
