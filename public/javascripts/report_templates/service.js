angular.module('ReportIt.report_template.services').
    factory('ReportTemplate', ['$http', function($http) {
        return {
                get: function(reportTemplateId) {
                    return $http.get('/report_templates/' + reportTemplateId);    
                },
                
                organizations: function() {
                    return $http.get('/organizations');    
                },
                
                snippets: function() {
                    return $http.get('/snippets');
                },
                
                update: function(reportTemplate) {
                    return $http.put('/report_templates/update/' + reportTemplate._id, angular.toJson(reportTemplate));
                },
                
                save: function(reportTemplate) {
                    return $http.post('/report_templates/create', angular.toJson(reportTemplate));
                }
            };  
}]);