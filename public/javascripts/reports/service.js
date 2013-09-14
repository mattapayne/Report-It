angular.module('ReportIt.report.services').
    factory('Report', ['$http', '$q', function($http, $q) {
        return {
                get: function(reportId) {
                    if (reportId) {
                        return $http.get('/reports/' + reportId);  
                    }
                    //because we are creating a new Report, there is no need to hit the backend.
                    //just return a promise that resolves to a new object.
                    var deferred = $q.defer();
                    deferred.resolve({name: '', description: '', content: '', organizations: [], _id: ''});
                    var promise = deferred.promise;
                    promise.success = function(fn) {
                        promise.then(function(response) {
                            fn(response);
                        });
                    };
                    return promise;
                },
                
                reportTemplates: function() {
                  return $http.get('/report_templates');   
                },
                
                organizations: function() {
                    return $http.get('/organizations');    
                },
                
                snippets: function() {
                    return $http.get('/snippets');
                },
                
                save: function(report) {
                    if (report._id) {
                        return $http.put('/reports/update/' + report._id, angular.toJson(report));
                    }
                    return $http.post('/reports/create', angular.toJson(report));
                }
            };  
}]);