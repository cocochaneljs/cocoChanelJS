(function() {
    CCJS.addPlugin('add-lorem-ipsum',function(){
        if (!this.currentSelectedElementNode)
            return;

        var lorem = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            ' Nunc lacinia vitae turpis vitae laoreet. Phasellus accumsan feugiat libero,',
            ' finibus laoreet augue sagittis vitae. Cum sociis natoque penatibus et magnis dis parturient montes,',
            ' nascetur ridiculus mus. Praesent ullamcorper pretium arcu vitae convallis.',
            ' Aliquam id eros congue, aliquet urna ac, vestibulum diam.',
            ' Interdum et malesuada fames ac ante ipsum primis in faucibus.',
            ' Nulla in velit vehicula, efficitur orci vitae, rhoncus mi.',
            ' Sed venenatis, magna ac tristique scelerisque,',
            ' dui libero euismod augue, vel mollis lectus ligula in erat.',
            ' Quisque nec tristique metus. Maecenas quis massa congue,',
            ' faucibus enim eu, molestie neque. Donec volutpat vulputate lacinia.',
            ' Sed maximus malesuada rhoncus. Pellentesque ac eleifend tortor, et accumsan mi.',
        ].join(''),
            lipsumElement = this.root_document.createElement('div');

        lipsumElement.className = "text lorem-ipsum";
        lipsumElement.innerHTML = lorem;

        this.currentSelectedElementNode.appendChild(lipsumElement);

        this.refreshData();
    }, true);
})();
