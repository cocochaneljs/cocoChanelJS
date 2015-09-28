/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

/**
 * @param {String} string1
 * @param {Array} array1
 * @returns {Boolean}
 */
function stringContainsElementOfArray (string1,array1) {
    var contained = false;

    for (var i = 0, ln = array1.length;i<ln;i++) {
        if (string1.indexOf(array1[i]) != -1) {
            contained = true;
            break;
        }
    }
    
    return contained;
}
