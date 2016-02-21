(function() {

    /*
    this plugin is actually the loading animation when refreshing
    the code was copied from codepen.io details below for credits.

    Helix Loader
    A PEN BY Opher Vishnia

    http://codepen.io/OpherV/pen/yeGeqZ
    */
    var element = CCJS.main_elementExtras;
    var html = [],
        styleHTML = [
            '.loader {',
            '  position: absolute;',
            '  width: 15rem;',
            '  height: 15rem;',
            '  left: 0;',
            '  top: 0;',
            '  -moz-transform: translateX(-50%) translateY(-50%) rotate(-90deg) scaleX(-1);',
            '  -ms-transform: translateX(-50%) translateY(-50%) rotate(-90deg) scaleX(-1);',
            '  -webkit-transform: translateX(-50%) translateY(-50%) rotate(-90deg) scaleX(-1);',
            '  transform: translateX(-50%) translateY(-50%) rotate(-90deg) scaleX(-1);',
            '  -webkit-transform: scale(0.8);',
            '  transform: scale(0.8);',
            '}',
            '.loader div {',
            '  position: absolute;',
            '  left: 0;',
            '  width: 0.5rem;',
            '  height: 0.5rem;',
            '  background: #dd3333;',
            '  border-radius: 1rem;',
            '  opacity: 0;',
            '}',
            '@-webkit-keyframes dna_rotate {',
            '  0% {',
            '    opacity: 1;',
            '    -webkit-transform: scale(1);',
            '    transform: scale(1);',
            '    left: 40%;',
            '    z-index: 0;',
            '  }',
            '  25% {',
            '    opacity: 1;',
            '    -webkit-transform: scale(1.8);',
            '    transform: scale(1.8);',
            '  }',
            '  50% {',
            '    opacity: 1;',
            '    left: 60%;',
            '    z-index: 1;',
            '    -webkit-transform: scale(1);',
            '    transform: scale(1);',
            '  }',
            '  75% {',
            '    opacity: 1;',
            '    -webkit-transform: scale(0.5);',
            '    transform: scale(0.5);',
            '  }',
            '  100% {',
            '    opacity: 1;',
            '    left: 40%;',
            '    z-index: 0;',
            '    -webkit-transform: scale(1);',
            '    transform: scale(1);',
            '  }',
            '}',
            '@keyframes dna_rotate {',
            '  0% {',
            '    opacity: 1;',
            '    -moz-transform: scale(1);',
            '    -ms-transform: scale(1);',
            '    -webkit-transform: scale(1);',
            '    transform: scale(1);',
            '    left: 40%;',
            '    z-index: 0;',
            '  }',
            '  25% {',
            '    opacity: 1;',
            '    -moz-transform: scale(1.8);',
            '    -ms-transform: scale(1.8);',
            '    -webkit-transform: scale(1.8);',
            '    transform: scale(1.8);',
            '  }',
            '  50% {',
            '    opacity: 1;',
            '    left: 60%;',
            '    z-index: 1;',
            '    -moz-transform: scale(1);',
            '    -ms-transform: scale(1);',
            '    -webkit-transform: scale(1);',
            '    transform: scale(1);',
            '  }',
            '  75% {',
            '    opacity: 1;',
            '    -moz-transform: scale(0.5);',
            '    -ms-transform: scale(0.5);',
            '    -webkit-transform: scale(0.5);',
            '    transform: scale(0.5);',
            '  }',
            '  100% {',
            '    opacity: 1;',
            '    left: 40%;',
            '    z-index: 0;',
            '    -moz-transform: scale(1);',
            '    -ms-transform: scale(1);',
            '    -webkit-transform: scale(1);',
            '    transform: scale(1);',
            '  }',
            '}',
            '.loader div:nth-child(1) {',
            '  top: 0rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 0s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 0s infinite ease-in-out;',
            '  animation: dna_rotate 2s 0s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(2) {',
            '  top: 0.6rem;',
            '  -moz-animation: dna_rotate 2s 1.1s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.1s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.1s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(3) {',
            '  top: 1.2rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 0.2s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 0.2s infinite ease-in-out;',
            '  animation: dna_rotate 2s 0.2s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(4) {',
            '  top: 1.8rem;',
            '  -moz-animation: dna_rotate 2s 1.3s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.3s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.3s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(5) {',
            '  top: 2.4rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 0.4s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 0.4s infinite ease-in-out;',
            '  animation: dna_rotate 2s 0.4s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(6) {',
            '  top: 3rem;',
            '  -moz-animation: dna_rotate 2s 1.5s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.5s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.5s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(7) {',
            '  top: 3.6rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 0.6s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 0.6s infinite ease-in-out;',
            '  animation: dna_rotate 2s 0.6s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(8) {',
            '  top: 4.2rem;',
            '  -moz-animation: dna_rotate 2s 1.7s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.7s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.7s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(9) {',
            '  top: 4.8rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 0.8s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 0.8s infinite ease-in-out;',
            '  animation: dna_rotate 2s 0.8s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(10) {',
            '  top: 5.4rem;',
            '  -moz-animation: dna_rotate 2s 1.9s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.9s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.9s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(11) {',
            '  top: 6rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 1s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(12) {',
            '  top: 6.6rem;',
            '  -moz-animation: dna_rotate 2s 2.1s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 2.1s infinite ease-in-out;',
            '  animation: dna_rotate 2s 2.1s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(13) {',
            '  top: 7.2rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 1.2s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.2s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.2s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(14) {',
            '  top: 7.8rem;',
            '  -moz-animation: dna_rotate 2s 2.3s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 2.3s infinite ease-in-out;',
            '  animation: dna_rotate 2s 2.3s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(15) {',
            '  top: 8.4rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 1.4s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.4s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.4s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(16) {',
            '  top: 9rem;',
            '  -moz-animation: dna_rotate 2s 2.5s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 2.5s infinite ease-in-out;',
            '  animation: dna_rotate 2s 2.5s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(17) {',
            '  top: 9.6rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 1.6s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.6s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.6s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(18) {',
            '  top: 10.2rem;',
            '  -moz-animation: dna_rotate 2s 2.7s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 2.7s infinite ease-in-out;',
            '  animation: dna_rotate 2s 2.7s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(19) {',
            '  top: 10.8rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 1.8s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 1.8s infinite ease-in-out;',
            '  animation: dna_rotate 2s 1.8s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(20) {',
            '  top: 11.4rem;',
            '  -moz-animation: dna_rotate 2s 2.9s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 2.9s infinite ease-in-out;',
            '  animation: dna_rotate 2s 2.9s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(21) {',
            '  top: 12rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 2s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 2s infinite ease-in-out;',
            '  animation: dna_rotate 2s 2s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(22) {',
            '  top: 12.6rem;',
            '  -moz-animation: dna_rotate 2s 3.1s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 3.1s infinite ease-in-out;',
            '  animation: dna_rotate 2s 3.1s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(23) {',
            '  top: 13.2rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 2.2s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 2.2s infinite ease-in-out;',
            '  animation: dna_rotate 2s 2.2s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(24) {',
            '  top: 13.8rem;',
            '  -moz-animation: dna_rotate 2s 3.3s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 3.3s infinite ease-in-out;',
            '  animation: dna_rotate 2s 3.3s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(25) {',
            '  top: 14.4rem;',
            '  background: #aaaadd;',
            '  -moz-animation: dna_rotate 2s 2.4s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 2.4s infinite ease-in-out;',
            '  animation: dna_rotate 2s 2.4s infinite ease-in-out;',
            '}',
            '.loader div:nth-child(26) {',
            '  top: 15rem;',
            '  -moz-animation: dna_rotate 2s 3.5s infinite ease-in-out;',
            '  -webkit-animation: dna_rotate 2s 3.5s infinite ease-in-out;',
            '  animation: dna_rotate 2s 3.5s infinite ease-in-out;',
            '}'

        ];

    var loader = document.createElement('div');
    var style = document.createElement('style');

    for (var i = 0; i < 26; i++) {
        html.push('<div></div>');
    }

    loader.classList.add('loader');

    loader.innerHTML = html.join('');
    style.innerHTML = styleHTML.join('');

    document.head.appendChild(style);
    element.appendChild(loader);
})();
