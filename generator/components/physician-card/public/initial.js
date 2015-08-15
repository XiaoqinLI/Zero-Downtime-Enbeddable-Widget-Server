(function(){
    var port = '<%= port %>' ? ':<%= port %>' : '';
    var gateway = '<%= gateway %>';
    var clientContainer = $('.physician-card');
    var id = ('<%= id %>') ? '<%= id %>' : 1;
    var host = '<%= host %>';
    $.each(clientContainer, function(){
        var container = $(this);
        $.ajax({
          url: 'http://' + gateway + port + '/widget/html/' + id,
                success: function(data){
                    container.html(data);
                }
            });
        });

    injectStyles();
    function injectStyles() {
        var css = '<%= inlineCss %>';
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.inlineCssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }
        var head = document.head || document.querySelector('head');
        head.appendChild(style);
    }
}());
