$(function(){
    var loadReports = $.ajax('/reports', {dataType: 'html'});
    var loadReportTemplates = $.ajax('/report_templates', {dataType: 'html'});
    var loadOrganizations = $.ajax('/organizations', {dataType: 'html'});
    var loadSnippets = $.ajax('/snippets', {dataType: 'html'});
    
    var reportsContainer = $('#reports-container');
    var reportTemplatesContainer = $("#report-templates-container");
    var organizationsContainer = $("#organizations-container");
    var snippetsContainer = $("#snippets-container");
    
    var loadData = function()
    {
        $.when(loadReports,
           loadReportTemplates,
           loadOrganizations,
           loadSnippets).
        then(function(reports, reportTemplates, organizations, snippets) {
            reportsContainer.html(reports[0]);
            reportTemplatesContainer.html(reportTemplates[0]);
            organizationsContainer.html(organizations[0]);
            snippetsContainer.html(snippets[0]);
        });
    };
    
    loadData();
});