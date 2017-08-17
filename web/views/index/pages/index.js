module.exports = function(templateParams) {
    var _cssList = ['common', 'index-index'];
    var webAssetsHelp = require('../../../webAssetsHelp.js')(templateParams, _cssList);
    console.log('templateParams: ', templateParams.htmlWebpackPlugin.options, webAssetsHelp);
    var _html = `{% extends '../../common/pages/layout.html' %}
        {% block title %}<%=title%>{% endblock %}
        {% block styles %}${webAssetsHelp.styles}{% endblock %}
        {% block content %}
        <p>Home page</p>
        {% endblock %}
        {% block scripts%}${webAssetsHelp.scripts}{% endblock%}`;
    return _html;
};