angular.module('ReportIt.dashboard.services').
    factory('Setting', ['$http', function($http) {
        return {
                all: function() {
                    return $http.get('/settings');    
                },

                update: function(setting) {
                    return $http.put('/settings/update/' + setting._id, angular.toJson(setting));
                }
            };  
}]);