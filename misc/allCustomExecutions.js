//This file contains all the after load custom executions like refreshing and some post process performs.
(function() {
    setTimeout(function() {
        CCJS.refreshData();
    }, 500);
})();
