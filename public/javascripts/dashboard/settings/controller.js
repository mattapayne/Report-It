angular.module('ReportIt.dashboard.controllers').
    controller('SettingsController', ['$scope', 'Setting', function($scope, Setting) {
        var self = this;
        $scope.settingsBeingEdited = {};
        $scope.settings = [];
        
        Setting.all().success(function(settings) {
           $scope.settings = settings; 
        });
        
        $scope.edit = function(index) {
            self.backupSetting(index);
        };
        
        $scope.editing = function(index) {
            return index in $scope.settingsBeingEdited;
        };
        
        $scope.editingAny = function() {
            return !_.isEmpty($scope.settingsBeingEdited);
        };
        
        $scope.stopEditing = function(index) {
            delete $scope.settingsBeingEdited[index];
        };
        
        $scope.cancelEditing = function(index) {
            var original = $scope.settingsBeingEdited[index];
            $scope.settings[index] = angular.copy(original);
            delete $scope.settingsBeingEdited[index];
        };
        
        $scope.update = function(index) {
            var setting = $scope.settings[index];
            Setting.update(setting).success(function() {
                $scope.stopEditing(index);
            }).error(function() {
                var original = $scope.settingsBeingEdited[index];
                $scope.settings[index] = angular.copy(original);
            });
        };

        self.backupSetting = function(index) {
            var organization = $scope.settings[index];
            $scope.settingsBeingEdited[index] = angular.copy(organization);
        };
    }]
);