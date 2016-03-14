(function () {

    window.campsiTemplates = [];

    var Template = require('./src/template');
    var scripts = document.getElementsByTagName('script');
    var i = 0;
    var l = scripts.length;
    var templatesReadyCount = 0;
    var templateReady = function(){
        templatesReadyCount++;
        if(templatesReadyCount === window.campsiTemplates.length){
            document.dispatchEvent(new CustomEvent('campsiready'))
        }
    };
    for (; i < l; i++) {
        if (scripts[i].type === 'text/x-handlebars-template+campsi') {
            window.campsiTemplates.push(new Template(scripts[i], templateReady));
        }
    }

})();