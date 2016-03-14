module.exports = function (url, callback) {
    var xmlHTTP = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MicrosoftXMLHTTP");
    xmlHTTP.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            callback(this.responseText);
    };
    xmlHTTP.open('GET', url, true);
    xmlHTTP.send();
};