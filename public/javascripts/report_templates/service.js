angular.module('ReportIt.report_template.services').
    factory('ReportTemplate', ['$http', '$q', function($http, $q) {
        return {
                get: function(reportTemplateId) {
                    if (reportTemplateId) {
                        return $http.get('/report_templates/' + reportTemplateId);  
                    }
                    //because we are creating a new ReportTemplate, there is no need to hit the backend.
                    //just return a promise that resolves to a new object.
                    var deferred = $q.defer();
                    deferred.resolve({name: '', description: '', content: '', organizations: []});
                    var promise = deferred.promise;
                    promise.success = function(fn) {
                        promise.then(function(response) {
                            fn(response);
                        });
                    };
                    return promise;
                },
                
                organizations: function() {
                    return $http.get('/organizations');    
                },
                
                snippets: function() {
                    return $http.get('/snippets');
                },
                
                save: function(reportTemplate) {
                    if (reportTemplate._id) {
                        return $http.put('/report_templates/update/' + reportTemplate._id, angular.toJson(reportTemplate));
                    }
                    return $http.post('/report_templates/create', angular.toJson(reportTemplate));
                }
            };  
}]);