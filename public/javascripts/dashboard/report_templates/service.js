angular.module('ReportIt.dashboard.services').
    factory('ReportTemplate', ['$http', function($http) {
        return {
                all: function() {
                    return $http.get('/report_templates');    
                },
                
                create: function(report_template) {
                  return $http.post('/report_templates/create', angular.toJson(report_template));  
                },

                update: function(report_template) {
                    return $http.put('/report_templates/update/' + report_template._id, angular.toJson(report_template));
                },
                
                destroy: function(report_template) {
                    return $http.delete('/report_templates/destroy/' + report_template._id);
                }
            };  
}]);