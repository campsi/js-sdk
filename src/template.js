'use strict';

var Handlebars = require('handlebars');
var dataset = require('dataset');
var GET = require('./ajax');
var extract = require('./extract');

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
    sort: null,
    where: null
};

Template.prototype.reload = function (callback) {
    this.load(function () {
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
    this.url = params.get('url');
    this.fallback = params.get('fallback');
    this.query.skip = params.get('skip');
    this.query.limit = params.get('limit');
    this.query.sort = params.get('sort');
    this.query.direction = params.get('direction');

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

    instance.loaded = false;

    var request = GET(this.url, query, function (err, data) {
        if (!err) {
            instance.entries = JSON.parse(data).entries;
            console.info(instance.entries);
            instance.loaded = true;
            callback.call(instance);
        } else if (instance.fallback) {
            instance.loaded = true;
            instance.loadFallback(callback);
        }
    });

    if (!this.fallback) {
        return;
    }

    setTimeout(function () {
        if (instance.loaded === false) {
            request.abort();
            instance.loadFallback(callback);
        }
    }, 1000);

};

Template.prototype.loadFallback = function (callback) {
    var instance = this;
    GET(this.fallback, {}, function (err, data) {
        if (err) {
            console.error(error);
            return callback.call(instance);
        }

        var json;

        try {
            json = JSON.parse(data)
        } catch (err) {
            console.error('malformed fallback');
            return callback.call(instance);
        }

        instance.entries = instance.filter(json.entries);
        callback.call(instance);
    })
};

Template.prototype.filter = function (entries) {
    var sort = this.query.sort;
    var direction = this.query.direction || 'asc';
    if (sort) {
        entries.sort(function (a, b) {
            var result = extract(a, sort) < extract(b, sort);
            return (direction === 'asc') ? result : !result;
        });
    }

    if (this.query.skip) {
        entries = entries.slice(this.query.skip);
    }

    if (this.query.limit) {
        entries = entries.slice(0, this.query.limit);
    }

    return entries;
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