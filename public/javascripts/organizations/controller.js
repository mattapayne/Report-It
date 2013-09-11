angular.module('inspectory.ly.dashboard.controllers').
    controller('OrganizationController', ['$scope', 'Organization', function($scope, Organization) {
        var self = this;
        $scope.organizationsBeingEdited = {};
        $scope.organizationsBeingDeleted = [];
        $scope.adding = false;
        $scope.organizationName = "";
        $scope.organizations = [];
        
        Organization.all().success(function(organizations) {
           $scope.organizations = organizations; 
        });
        
        self.backupOrganization = function(index) {
            var organization = $scope.organizations[index];
            $scope.organizationsBeingEdited[index] = angular.copy(organization);
        };
        
        //since there is no 'finally' construct in Angular's promise returned by $http, we have to duplicate some code.
        self.deleteOrganization = function(index, organization) {
            Organization.destroy(organization).success(function() {
                $scope.organizations.splice(index, 1);
                $scope.organizationsBeingDeleted =
                    _.reject($scope.organizationsBeingDeleted, function(num) {
                        return num === index
                });
                }).error(function() {
                    $scope.organizationsBeingDeleted =
                        _.reject($scope.organizationsBeingDeleted, function(num) {
                            return num === index
                    });
                });
        };
        
        $scope.edit = function(index) {
            self.backupOrganization(index);
        };
        
        $scope.editing = function(index) {
            return index in $scope.organizationsBeingEdited;
        };
        
        $scope.deleting = function(index) {
            return _.contains($scope.organizationsBeingDeleted, index);
        };
        
        $scope.editingAny = function() {
            return !_.isEmpty($scope.organizationsBeingEdited);
        };
        
        $scope.stopEditing = function(index) {
            delete $scope.organizationsBeingEdited[index];
        };
        
        $scope.cancelEditing = function(index) {
            var original = $scope.organizationsBeingEdited[index];
            $scope.organizations[index] = angular.copy(original);
            delete $scope.organizationsBeingEdited[index];
        };
        
        $scope.update = function(index) {
            var organization = $scope.organizations[index];
            Organization.update(organization).success(function() {
                $scope.stopEditing(index);
            }).error(function() {
                var original = $scope.organizationsBeingEdited[index];
                $scope.organizations[index] = angular.copy(original);
            });
        };
       
        $scope.destroy = function(index) {
            var organization = $scope.organizations[index];
            if (confirm("Are you sure?")) {
                $scope.organizationsBeingDeleted.push(index);
                self.deleteOrganization(index, organization);
            }
        };
        
        $scope.startAdd = function() {
            $scope.adding = true;
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
            });
        };
    }]
);