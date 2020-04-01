Array.prototype.remove = function(elementToDelete) {
    let ind = this.indexOf(elementToDelete);
    if(ind >= 0) {
        return this.splice(ind, 1);
    }
    return null;
}

Array.prototype.findLast = function(predicate, thisarg = this) {
    if(typeof predicate !== 'function') {
        throw "Error in function findLast: provided predicate is not a function";
    }
    for(let i = thisarg.length-1; i >= 0; i++) {
        if(predicate(thisarg[i], i, thisarg)) {
            return thisarg[i];
        }
    }
    return null;
}

Array.prototype.findLastIndex = function(predicate, thisarg = this) {
    if(typeof predicate !== 'function') {
        throw "Error in function findLastIndex: provided predicate is not a function";
    }
    for(let i = thisarg.length-1; i >= 0; i++) {
        if(predicate(thisarg[i], i, thisarg)) {
            return i;
        }
    }
    return -1;
}