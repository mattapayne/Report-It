angular.module('inspectory.ly.dashboard.controllers').
    controller('SnippetsController', ['$scope', 'Snippet', function($scope, Snippet) {
        
        $scope.adding = false;
        $scope.editingIndices = [];
        $scope.snippetName = "";
        $scope.snippetContent = "";
        $scope.snippets = [];
        $scope.errors = null;
        
        Snippet.all().success(function(snippets) {
           $scope.snippets = snippets; 
        });
        
        $scope.isError = function() {
            return $scope.errors !== null;
        };
        
        $scope.edit = function(index) {
            $scope.editingIndices.push(index);
            $scope.errors = null;
        };
        
        $scope.editing = function(index) {
            return _.contains($scope.editingIndices, index);
        };
        
        $scope.stopEditing = function(index) {
            var indexOfItemToRemove = $scope.editingIndices.indexOf(index);
            if (indexOfItemToRemove != -1) {
                $scope.editingIndices.splice(indexOfItemToRemove, 1);
            }
        };
        
        $scope.update = function(index) {
            var snippet = $scope.snippets[index];
            Snippet.update(snippet).success(function() {
                $scope.stopEditing(index);
                $scope.errors = null;
            }).error(function(data, status, headers, config) {
                $scope.errors = data;    
            });
        };
       
        $scope.destroy = function(index) {
            var snippet = $scope.snippets[index];
            if (confirm("Are you sure?")) {
                Snippet.destroy(snippet).success(function() {
                    $scope.snippets.splice(index, 1);
                    $scope.errors = null;
                }).error(function(data, status, headers, config) {
                    $scope.errors = data;  
            });
            }
        };
        
        $scope.startAdd = function() {
            $scope.adding = true;
            $scope.errors = null;
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
                $scope.errors = null;
            }).error(function(data, status, headers, config) {
                $scope.errors = data;
            });
        };
    }]
);