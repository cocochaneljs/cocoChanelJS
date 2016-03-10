(function() {
    function EventListenerWrapper () {
        this.listeners = [];
        this.wrappers = {};

        this.initWrappers();
    }

    EventListenerWrapper.prototype.addEventListener = function(element, eventName, callback, scope, useCapture) {
        var me = this,
            listener = {
                element: element,
                eventName: eventName,
                callback: callback,
                scope: scope,
                useCapture: useCapture
            };

        listener.fnx = function (e) {
            for (var key in me.wrappers) {
                e[key] = me.wrappers[key];
            }

            listener.callback.apply(listener.scope, arguments);
        };

        listener.element.addEventListener(listener.eventName, listener.fnx, listener.useCapture);
        this.listeners.push(listener);
    };

    EventListenerWrapper.prototype.removeEventListener = function(element, eventName) {
        var listener = this.getListener(element, eventName),
            index = this.indexListener(listener);

        listener.element.removeEventListener(listener.eventName,listener.fnx,listener.useCapture);

        delete listener.element;
        delete listener.eventName;
        delete listener.callback;
        delete listener.scope;
        delete listener.fnx;
        delete listener.useCapture;

    };

    EventListenerWrapper.prototype.getListener = function(element, eventName) {
        for (var i = 0, listeners = this.listneers, ln = listners; i < ln; i++) {
            if (listeners[i].element === element && listeners[i].eventName === eventName)
                return listeners[i];
        }

        return false;
    };

    EventListenerWrapper.prototype.indexListener = function(listener) {
        return this.listeners.indexOf(listener);
    };

    EventListenerWrapper.prototype.initWrappers = function () {
        this.wrappers['getTarget'] = function (selector, depth) {
            var target = null,
                currentElement = this.target;

            depth = depth || 1;

            for (var i = 0; i < depth; i++) {
                if (!currentElement.matches)
                    break;

                if (currentElement.matches(selector)) {
                    target = currentElement;
                    break;
                }

                if (! currentElement.parentNode)
                    break;

                currentElement = currentElement.parentNode;
            }

            return target;
        };
    };

    module.exports = new EventListenerWrapper();
})();
