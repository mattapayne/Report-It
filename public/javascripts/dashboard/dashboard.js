$(function(){
    
    var loadReports = $.ajax('/reports', {dataType: 'html'});
    var reportsContainer = $('#reports-container');
    
    var loadData = function()
    {
        $.when(loadReports).
        then(function(reports) {
            reportsContainer.html(reports);
        });
    };
    
    loadData();
});