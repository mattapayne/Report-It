angular.module('ReportIt.dashboard.controllers').
    controller('ReportsController', ['$scope', 'Report', function($scope, Report) {
        var self = this;
        $scope.reportsBeingDeleted = [];
        $scope.reports = [];
        
        Report.all().success(function(reports) {
           $scope.reports = reports; 
        });
        
        $scope.deleting = function(index) {
            return _.contains($scope.reportsBeingDeleted, index);
        };
       
        $scope.destroy = function(index) {
            var report = $scope.reports[index];
            if (confirm("Are you sure?")) {
                $scope.reportsBeingDeleted.push(index);
                self.deleteReport(index, report);
            }
        };
        
        self.stopManagingReport = function(index) {
            $scope.reportsBeingDeleted =
                        _.reject($scope.reportsBeingDeleted, function(num) {
                            return num === index
                    });
        };
        
        //since there is no 'finally' construct in Angular's promise returned by $http, we have to duplicate some code.
        self.deleteReport = function(index, report) {
            Report.destroy(report).success(function() {
                    $scope.reports.splice(index, 1);
                    self.stopManagingReport(index);
                }).error(function() {
                    self.stopManagingReport(index);
                });
        };
    }]
);