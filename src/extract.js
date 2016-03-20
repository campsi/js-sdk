module.exports = function (obj, path) {
    var i = 0;
    var parts = path.split('.');
    var l = parts.length;
    var ref = obj;
    for (; i < l; i++) {
        if (typeof ref[parts[i]] !== 'undefined') {
            ref = obj;
        } else {
            return;
        }
    }
    return ref;
};