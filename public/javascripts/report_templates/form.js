$(function() {

    $("#editor").redactor({
        imageUpload : '/images/upload/',
        clipboardUploadUrl: '/images/upload/',
        focus: true,
        minHeight: 500,
        linebreaks: true,
        paragraphy: false,
        plugins: ['clips', 'fontsize']
    });
    
    //TODO - Move this to Angular
    var loadSnippets = $.ajax('/snippets/with_content', { dataType: 'html' });
    var loadOrganization = $.ajax('/organizations/as_select', { dataType: 'html' });
    
    var snippetsContainer = $("#snippets-container");
    var organizationsSelectContainer = $("#organizations-select-container");
    
    var loadData = function()
    {
      $.when(loadSnippets, loadOrganization).then(function(snippets, organizations) {
             snippetsContainer.html(snippets[0]);
             organizationsSelectContainer.html(organizations[0]);
        });  
    };
    
    loadData();
    
    $("#snippets-container").delegate("a.snippet-name", "click", function(e) {
        e.preventDefault();
        var siblings = $(this).siblings("div.snippet-actual");
        
        if (siblings.hasClass("hidden")) {
            siblings.removeClass("hidden");
        }
        else {
            siblings.addClass("hidden");
        }
    });
});