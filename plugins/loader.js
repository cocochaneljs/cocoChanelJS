(function() {

    /*
    this plugin is actually the loading animation when refreshing
    the code was copied from codepen.io details below for credits.

    CSS Stairs Loader
    A PEN BY Irko Palenius

    http://codepen.io/ispal/pen/mVaaJe
    */
    var element = CCJS.main_elementExtras;
    var html = [
        '<div class="loader">',
            '<div class="dot"></div>',
            '<div class="dot"></div>',
            '<div class="dot"></div>',
            '<div class="dot"></div>',
        '</div>'
        ],
        styleHTML = [
            '.loader * {',
            '  -webkit-box-sizing: border-box;',
            '  -moz-box-sizing: border-box;',
            '  box-sizing: border-box;',
            '}',
            '.loader {',
            '  position: absolute !important;',
            '  top: 50%;',
            '  left: 50%;',
            '  width: 50px;',
            '  height: 50px;',
            '  margin-top: -25px !important;',
            '  margin-left: -25px !important;',
            '  overflow: visible !important;',
            '  perspective: 50px;',
            '  transform-style: perserve-3d;',
            '}',
            '.dot {',
            '  position: absolute;',
            '  top: 50%;',
            '  left: 50%;',
            '  width: 50px;',
            '  height: 20px;',
            '  margin-top: -25px;',
            '  margin-left: -25px;',
            '  border: 5px solid #d33;',
            '  box-shadow: 0 0 2px 2px rgba(0,0,0,0.3), inset 0 0 2px 2px rgba(0,0,0,0.3);',
            '  transform-style: perserve-3d;',
            '  transform: scale(0) rotateX(60deg);',
            '  animation: dot 2s cubic-bezier(.67, .08, .46, 1.5) infinite;',
            '}',
            '.dot:nth-child(2) {',
            '  animation-delay: 100ms;',
            '}',
            '.dot:nth-child(3) {',
            '  animation-delay: 200ms;',
            '}',
            '.dot:nth-child(4) {',
            '  animation-delay: 300ms;',
            '}',
            '@keyframes dot {',
            '  0% {',
            '    opacity: 0;',
            '    border-color: #aad;',
            '    transform: rotateX(-60deg) rotateY(45deg) translateZ(-50px) scale(0.1);',
            '  }',
            '  50% {',
            '    opacity: 0.5;',
            '    transform: rotateX(0deg) rotateY(0deg) translateZ(0) scale(1);',
            '  }',
            '  100% {',
            '    opacity: 0;',
            '    transform: rotateX(60deg) rotateY(-45deg) translateZ(-50px) scale(0.1);',
            '  }',
            '}'
        ];

    var style = document.createElement('style');

    style.innerHTML = styleHTML.join('');

    document.head.appendChild(style);
    element.innerHTML = html.join('');
})();
