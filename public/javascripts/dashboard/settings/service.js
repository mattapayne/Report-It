angular.module('ReportIt.dashboard.services').
    factory('Setting', ['$http', function($http) {
        return {
                all: function() {
                    return $http.get('/user_settings');    
                },

                update: function(setting) {
                    return $http.put('/user_settings/update/' + setting._id, angular.toJson(setting));
                }
            };  
}]);