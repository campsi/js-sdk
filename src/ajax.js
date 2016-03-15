var serialize = function (obj, prefix) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p) && typeof obj[p] !== 'undefined') {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
};

module.exports = function (url, params, callback) {

    if(arguments.length === 3){
        url+= '?' + serialize(params);
    } else {
        callback = params;
    }

    var xmlHTTP = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MicrosoftXMLHTTP");
    xmlHTTP.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            callback(this.responseText);
    };
    xmlHTTP.open('GET', url, true);
    xmlHTTP.send();
};