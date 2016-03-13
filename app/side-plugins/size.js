(function () {
    CCJS.addRightSidePanePlugin({
        title: 'Size',
        template: [
            '<input type="" name="width" placeholder="Width"/>',
            '<input type="text" name="heigth" placeholder="Height"/>',
        ],
        action: function(element, event) {
            var current = this.currentSelectedElementNode,
                computedStyle = CSSMagic.parse(current.getAttribute('style') || '');

            CSSMagic.addStatement(computedStyle, 'width', element.querySelector('[name="width"]').value );
            CSSMagic.addStatement(computedStyle, 'heigth', element.querySelector('[name="heigth"]').value );

            current.setAttribute('style', CSSMagic.stringify(computedStyle));
        },
        init: function(element) {
            var current = this.currentSelectedElementNode,
                computedStyle = CSSMagic.parse(current.getAttribute('style') || '');

            element.querySelector('[name="width"]').value = computedStyle['width'] || '';
            element.querySelector('[name="height"]').value = computedStyle['height'] || '';
        },
        elementTypes: ['BODY', 'DIV', 'A', 'P', 'B']
    });
})();
