(function () {
    function keyHandler(e) {
        var TABKEY = 9;
        var code = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
        var val = e.target;
        var carret;

        if(code == TABKEY && !e.shiftKey && !e.ctrlKey && !e.altKey) {
            carret = getCaretPosition(val);
            val.value=(val.value).substring(0,carret) + "    " + (val.value).substring(carret);
            //document.getElementById("t1").value += "    ";

            setCaretPosition(carret+4);

            if(e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
            val.focus();
            return false;
        }
        if(code == TABKEY && e.shiftKey && !e.ctrlKey && !e.altKey) {
            carret = getCaretPosition(val);
            val.value=(val.value).substring(0,carret-4) + (val.value).substring(carret);

            setCaretPosition(carret-4);

            if(e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
            return false;
        }

    }

    function getCaretPosition(el) {
      if (el.selectionStart) {
        return el.selectionStart;
      } else if (document.selection) {
        el.focus();

        var r = document.selection.createRange();
        if (r == null) {
          return 0;
        }

        var re = el.createTextRange(),
            rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);

        return rc.text.length;
      }
      return 0;
    }

    function setCaretPosition(elemId, caretPos) {
        var elem = document.getElementById(elemId);

        if(elem != null) {
            if(elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if(elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
    }

    window['setCaretPosition'] = setCaretPosition;
    window['getCaretPosition'] = getCaretPosition;
    window['keyHandler'] = keyHandler;
})();
