angular.module('ReportIt.dashboard.services').
    factory('Report', ['$http', function($http) {
        return {
                all: function() {
                    return $http.get('/reports');    
                },
                
                create: function(report) {
                  return $http.post('/reports/create', angular.toJson(report));  
                },

                update: function(report) {
                    return $http.put('/reports/update/' + report._id, angular.toJson(report));
                },
                
                destroy: function(report) {
                    return $http.delete('/reports/destroy/' + report._id);
                }
            };  
}]);