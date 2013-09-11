angular.module('InspectIt.dashboard.services').
    factory('Organization', ['$http', function($http) {
        return {
                all: function() {
                    return $http.get('/organizations');    
                },
                
                create: function(organization) {
                  return $http.post('/organizations/create', angular.toJson(organization));  
                },

                update: function(organization) {
                    return $http.put('/organizations/update/' + organization._id, angular.toJson(organization));
                },
                
                destroy: function(organization) {
                    return $http.delete('/organizations/destroy/' + organization._id);
                } 
            };  
}]);