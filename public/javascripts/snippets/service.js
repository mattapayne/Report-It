angular.module('InspectIt.dashboard.services').
    factory('Snippet', ['$http', function($http) {
        return {
                all: function() {
                    return $http.get('/snippets');    
                },
                
                create: function(snippet) {
                  return $http.post('/snippets/create', angular.toJson(snippet));  
                },

                update: function(snippet) {
                    return $http.put('/snippets/update/' + snippet._id, angular.toJson(snippet));
                },
                
                destroy: function(snippet) {
                    return $http.delete('/snippets/destroy/' + snippet._id);
                }
            };  
}]);