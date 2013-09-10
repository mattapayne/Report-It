$(function(){
    
    var loadReports = $.ajax('/reports', {dataType: 'html'});
    var loadReportTemplates = $.ajax('/report_templates', {dataType: 'html'});
    
    var reportsContainer = $('#reports-container');
    var reportTemplatesContainer = $("#report-templates-container");
    
    var loadData = function()
    {
        $.when(loadReports,
           loadReportTemplates).
        then(function(reports, reportTemplates, organizations) {
            reportsContainer.html(reports[0]);
            reportTemplatesContainer.html(reportTemplates[0]);
        });
    };
    
    loadData();
});