angular.module('ReportIt.dashboard.controllers').
    controller('SnippetsController', ['$scope', 'Snippet', function($scope, Snippet) {
        var self = this;
        $scope.adding = false;
        $scope.snippetsBeingEdited = {};
        $scope.snippetsBeingDeleted = [];
        $scope.snippetName = "";
        $scope.snippetContent = "";
        $scope.snippets = [];
        
        Snippet.all().success(function(snippets) {
           $scope.snippets = snippets; 
        });
        
        self.backupSnippet = function(index) {
            var snippet = $scope.snippets[index];
            $scope.snippetsBeingEdited[index] = angular.copy(snippet);
        };
        
        //since there is no 'finally' construct in Angular's promise returned by $http, we have to duplicate some code.
        self.deleteSnippet = function(index, snippet) {
            Snippet.destroy(snippet).success(function() {
                    $scope.snippets.splice(index, 1);
                    $scope.snippetsBeingDeleted =
                        _.reject($scope.snippetsBeingDeleted, function(num) {
                            return num === index
                    });
                }).error(function() {
                    $scope.snippetsBeingDeleted =
                        _.reject($scope.snippetsBeingDeleted, function(num) {
                            return num === index
                    });
                });
        };
        
        $scope.edit = function(index) {
            self.backupSnippet(index);
        };
        
        $scope.editing = function(index) {
            return index in $scope.snippetsBeingEdited;
        };
        
        $scope.deleting = function(index) {
            return _.contains($scope.snippetsBeingDeleted, index);
        };
        
        $scope.editingAny = function() {
            return !_.isEmpty($scope.snippetsBeingEdited);
        };
        
        $scope.stopEditing = function(index) {
           delete $scope.snippetsBeingEdited[index];
        };
        
        $scope.cancelEditing = function(index) {
            var original = $scope.snippetsBeingEdited[index];
            $scope.snippets[index] = angular.copy(original);
            delete $scope.snippetsBeingEdited[index];
        };
        
        $scope.update = function(index) {
            var snippet = $scope.snippets[index];
            Snippet.update(snippet).success(function() {
                $scope.stopEditing(index);
            }).error(function() {
                var original = $scope.snippetsBeingEdited[index];
                $scope.snippets[index] = angular.copy(original);    
            });
        };
       
        $scope.destroy = function(index) {
            var snippet = $scope.snippets[index];
            if (confirm("Are you sure?")) {
                $scope.snippetsBeingDeleted.push(index);
                self.deleteSnippet(index, snippet);
            }
        };
        
        $scope.startAdd = function() {
            $scope.adding = true;
        };
        
        $scope.stopAdd = function() {
            $scope.snippetName = "";
            $scope.snippetContent = "";
            $scope.adding = false;
        };
        
        $scope.create = function() {
            var snippet = { name: $scope.snippetName, content: $scope.snippetContent };
            Snippet.create(snippet).success(function(snip) {
                $scope.snippets.push(snip);
                $scope.stopAdd();
            });
        };
    }]
);