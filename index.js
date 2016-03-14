(function () {

    window.campsiTemplates = [];

    var Template = require('./src/template');
    var scripts = document.getElementsByTagName('script'), i = 0, l = scripts.length;

    for (; i < l; i++) {
        if (scripts[i].type === 'text/x-handlebars-template+campsi') {
            window.campsiTemplates.push(new Template(scripts[i]));
        }
    }

})();