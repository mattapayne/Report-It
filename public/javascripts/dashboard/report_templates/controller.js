angular.module('ReportIt.dashboard.controllers').
    controller('ReportTemplatesController', ['$scope', 'ReportTemplate', function($scope, ReportTemplate) {
        var self = this;
        $scope.reportTemplatesBeingDeleted = [];
        $scope.reportTemplates = [];
        
        ReportTemplate.all().success(function(reportTemplates) {
           $scope.reportTemplates = reportTemplates; 
        });
        
        //since there is no 'finally' construct in Angular's promise returned by $http, we have to duplicate some code.
        //TODO - Refactor duplicated code into function
        self.deleteReportTemplate = function(index, reportTemplate) {
            ReportTemplate.destroy(reportTemplate).success(function() {
                    $scope.reportTemplates.splice(index, 1);
                    $scope.reportTemplatesBeingDeleted =
                        _.reject($scope.reportTemplatesBeingDeleted, function(num) {
                            return num === index
                    });
                }).error(function() {
                    $scope.reportTemplatesBeingDeleted =
                        _.reject($scope.reportTemplatesBeingDeleted, function(num) {
                            return num === index
                    });
                });
        };
        
        $scope.deleting = function(index) {
            return _.contains($scope.reportTemplatesBeingDeleted, index);
        };
       
        $scope.destroy = function(index) {
            var reportTemplate = $scope.reportTemplates[index];
            if (confirm("Are you sure?")) {
                $scope.reportTemplatesBeingDeleted.push(index);
                self.deleteReportTemplate(index, reportTemplate);
            }
        };
    }]
);