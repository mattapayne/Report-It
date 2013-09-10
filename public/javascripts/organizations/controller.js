angular.module('inspectory.ly.dashboard.controllers').
    controller('OrganizationController', ['$scope', 'Organization', function($scope, Organization) {
        
        $scope.adding = false;
        $scope.editingIndices = [];
        $scope.organizationName = "";
        $scope.organizations = [];
        $scope.errors = null;
        
        Organization.all().success(function(organizations) {
           $scope.organizations = organizations; 
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
            var organization = $scope.organizations[index];
            Organization.update(organization).success(function() {
                $scope.stopEditing(index);
                $scope.errors = null;
            }).error(function(data, status, headers, config) {
                $scope.errors = data;    
            });
        };
       
        $scope.destroy = function(index) {
            var organization = $scope.organizations[index];
            if (confirm("Are you sure?")) {
                Organization.destroy(organization).success(function() {
                    $scope.organizations.splice(index, 1);
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
            $scope.organizationName = "";
            $scope.adding = false;
        };
        
        $scope.create = function() {
            var organization = { name: $scope.organizationName };
            Organization.create(organization).success(function(org) {
                $scope.organizations.push(org);
                $scope.stopAdd();
                $scope.errors = null;
            }).error(function(data, status, headers, config) {
                $scope.errors = data;    
            });
        };
    }]
);