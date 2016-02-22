// Documentation on how to create a plugin
// it's actually very simple

/*
    cocoChanelJS.addPlugin(
        title [String],
        action [Function],
        fastPane [Boolean],
        selectionRequired [Boolean]
    );
    // Documentation:
        (title) it's the title string , its passed as trough translation,
        if translation has a reference will use the translation else
        the value that's passed as title

        (action) it's the method that will get executed upon tapping
        on the button coresponding to the plugin, the scope/context of the execution will be cocoChanelJS

        (fastPane) it's a boolean that will dictate wether the button is placed
        in the right-top panel ( the one with File) or on the left-sided panel

        (selectionRequired) it's a boolean that will disable the button action
        if there is no selected element in the editor


    cocoChanelJS.showPopupElement(
        template [String],
        callback [Function],
        scope [Object/Context],
        personalizedClose [Boolean]
    );
    // Documentation:
        (template) it's a string containing all the template of the plugin

        (callback) it's the function that gets executed upon tapping in the popup

        (scope) it's the scope/context in which the callback will be executed

        (personalizedClose) dictates wether the popup should
        close on any tap or by pressing the close button
        please note that if you don't provide the button in the template,
        user will be left with no exit way from the popup

*/

// here is the demonstration

// (function() {
//     CCJS.addPlugin('Hello world!',function(){
//         var me = this,
//             template = [
//                 // this line is very important if personalizedClose is true , without this line you can't exit
//                 '<div data-button="" data-close-button="true">',this.language['close-popup'],'</div>',
//                 '<div data-content="">',
//                     'Hello World!!',
//                 '</div>'
//             ];
//
//         me.showPopupElement(template.join(''), function(evt) {
//             if (!evt.target.getAttribute('data-close-button'))
//                 window['dialog'].showErrorBox('Hello World');
//         }, me, true);
//     }, "tests", true);
// })();
