(function () {
    CCJS.addRightSidePaneModule({
        title: 'Size',
        template: [
            '<div class="in-row-2">',
                '<input type="" name="width" placeholder="Width"/>',
                '<input type="text" name="height" placeholder="Height"/>',
            '</div>'
        ],
        action: function(element, event) {
            var current = this.currentSelectedElementNode,
                computedStyle = CSSMagic.parse(current.getAttribute('style') || '');

            CSSMagic.addStatement(computedStyle, 'width', element.querySelector('[name="width"]').value );
            CSSMagic.addStatement(computedStyle, 'height', element.querySelector('[name="height"]').value );

            current.setAttribute('style', CSSMagic.stringify(computedStyle));
        },
        init: function(element) {
            var current = this.currentSelectedElementNode,
                computedStyle = CSSMagic.parse(current.getAttribute('style') || '');

            element.querySelector('[name="width"]').value = computedStyle['width'] || '';
            element.querySelector('[name="height"]').value = computedStyle['height'] || '';
        },
        elementTypes: ['ALL']
    });
})();
