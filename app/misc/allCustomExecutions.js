//This file contains all the after load custom executions like refreshing and some post process performs.
(function() {
    setTimeout(function() {
        CCJS.refreshData();
    }, 500);

    window.onbeforeunload = function() {
        
        return 'Your work will be lost...';

    };

})();
