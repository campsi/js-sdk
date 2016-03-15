'use strict';

var Handlebars = require('handlebars');
var dataset = require('dataset');
var GET = require('./ajax');

var Template = function (scriptEl, callback) {
    this.el = scriptEl;
    this.el.template = this;
    this._hb = Handlebars.compile(scriptEl.text);
    this._nodes = [];
    this.query = {};
    this.getParameters();
    this.reload(callback);
};

Template.defaults = {
    page: 1,
    itemsPerPage: 20,
    sort: null,
    where: null
};

Template.prototype.reload = function(callback){
    this.load(function(){
        this.render();
        if (typeof callback === 'function') {
            callback();
        }
    })
};

Template.prototype.render = function () {
    this.empty();
    var parent = this.el.parentNode;
    var div = document.createElement('div');
    div.innerHTML = this._hb(this);
    while (div.childElementCount > 0) {
        parent.insertBefore(div.firstChild, this.el);
        this._nodes.push(div.firstChild);
    }
};

Template.prototype.empty = function () {
    var i = 0;
    var l = this._nodes.length;
    for (; i < l; i++) {
        if (this._nodes[i].parentNode) {
            //todo add callback for animation: this.beforeEmpty(this._nodes[i], function(){ ... removeChild ... })
            this._nodes[i].parentNode.removeChild(this._nodes[i]);
        }
    }
    this._nodes.length = 0;
};

Template.prototype.getParameters = function () {
    var params = dataset(this.el);
    this.project = params.get('project');
    this.collection = params.get('collection');
    this.query.skip = params.get('skip');
    this.query.limit = params.get('limit');
    this.query.sort = params.get('sort') || Template.defaults.sort;

    var whereParam = params.get('where');
    if (whereParam) {
        try {
            this.query.where = JSON.parse(whereParam);
        } catch (err) {
            console.error("malformed json in 'data-where' attribute with value", "'" + whereParam + "'", err);
        }
    }
};

Template.prototype.load = function (callback) {
    var instance = this;
    var query = this.buildQuery();
    var url = 'https://campsi.io/api/v1/projects/' + this.project + '/collections/' + this.collection + '/entries';
    GET(url, query, function (data) {
        instance.entries = JSON.parse(data);
        callback.call(instance);
    });
};

Template.prototype.buildQuery = function () {

    var params = {
        skip: this.query.skip,
        limit: this.query.limit,
        sort: this.query.sort
    };

    for (var prop in this.query.where) {
        if (this.query.where.hasOwnProperty(prop)) {
            params['data.' + prop] = this.query.where[prop];
        }
    }

    return params;
};

module.exports = Template;