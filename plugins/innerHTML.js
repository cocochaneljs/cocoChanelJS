// (function() {
//     CCJS.addPlugin('innerHTML', function(){
//         if(!this.currentSelectedElementNode)
//             return;
//
//             this.showPopupElement([
//                 '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
//                 '<textarea wrap="on" spellcheck="false" placeholder="',
//                     this.language['write-innerhtml-placeholder'],
//                 '" style="width:100%;height:100%">',
//                 this.currentSelectedElementNode.innerHTML,
//                 '</textarea>'
//             ].join(''),function(e){
//                 if (e.target.nodeName == "TEXTAREA")
//                     return;
//
//                 this.currentSelectedElementNode.innerHTML = this.main_popup.element.querySelector('textarea').value;
//
//                 this.softRefreshData();
//             }, false, true);
//     }, true, true);
// })();
