var Handlebars = require('handlebars');
var dataset = require('dataset');
var GET = require('./ajax');

var Template = function (scriptEl, callback) {
    this.el = scriptEl;
    this.hb = Handlebars.compile(scriptEl.text);
    this.project = dataset(scriptEl, 'project');
    this.collection = dataset(scriptEl, 'collection');

    this.load(function () {

        this.el.parentNode.innerHTML = this.hb(this);

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

module.exports = Template;