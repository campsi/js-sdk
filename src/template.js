var Handlebars = require('handlebars');
var GET = require('./ajax');

var Template = function (scriptEl, callback) {
    this.el = scriptEl;
    this.hb = Handlebars.compile(scriptEl.text);
    this.parseId();
    this.load(function () {
        var tempEl = document.createElement('div');
        tempEl.innerHTML = this.hb(this);
        this.el.parentNode.replaceChild(tempEl, this.el);
        if(typeof callback === 'function'){
            callback();
        }
    });
};

Template.prototype.load = function (callback) {
    var instance = this;
    GET('http://campsi.io/api/v1/projects/' + this.project + '/collections/' + this.collection + '/entries', function (data) {
        instance.entries = JSON.parse(data);
        callback.call(instance);
    });
};

Template.prototype.parseId = function () {
    var parts = this.el.id.split('--');
    this.project = parts[0];
    this.collection = parts[1];
};

module.exports = Template;