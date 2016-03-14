(function () {
    CCJS.addRightSidePaneModule({
        title: 'Border',
        template: [
            '<input type="" name="size" placeholder="Size"/>',
            '<input type="text" name="style" placeholder="Style"/>',
            '<input type="color" name="color" placeholder="Color"/>'
        ],
        action: function(element, event) {
            var current = this.currentSelectedElementNode,
                computedStyle = CSSMagic.parse(current.getAttribute('style') || '');

            CSSMagic.addStatement(computedStyle, 'border-width', element.querySelector('[name="size"]').value );
            CSSMagic.addStatement(computedStyle, 'border-color', element.querySelector('[name="color"]').value );
            CSSMagic.addStatement(computedStyle, 'border-style', element.querySelector('[name="style"]').value );

            current.setAttribute('style', CSSMagic.stringify(computedStyle));
        },
        init: function(element) {
            var current = this.currentSelectedElementNode,
                computedStyle = CSSMagic.parse(current.getAttribute('style') || '');

            element.querySelector('[name="size"]').value = computedStyle['border-width'] || '';
            element.querySelector('[name="color"]').value = computedStyle['border-color'] || '';
            element.querySelector('[name="style"]').value = computedStyle['border-style'] || '';
        },
        elementTypes: ['ALL']
    });
})();
