angular.module('ReportIt.report.controllers').
    controller('ReportController', ['$scope', 'Report', function($scope, Report) {
      
      var self = this;
      $scope.requirementMessages = {};
      $scope.reportTemplates = [];
      $scope.organizations = [];
      $scope.snippets = [];
      $scope.report = null;
      
      $scope.redactorOptions = {
        imageUpload : '/images/upload/',
        clipboardUploadUrl: '/images/upload/',
        focus: true,
        minHeight: 550,
        linebreaks: true,
        paragraphy: false,
        plugins: ['clips', 'fontsize', 'fontfamily', 'fontcolor', 'fullscreen']
      };
      
      $scope.useReportTemplate = function() {
        var template = _.find($scope.reportTemplates, function(t) {
          return t._id === $scope.report.report_template;
        });
        if (template) {
          $scope.report.content = template.content;
          $scope.report.client = template.client;
          if (template.organizations.length > 0) {
            _.each($scope.organizations, function(o) {
                o.associated = self.isOrganizationAssociatedWithTemplate(o, template);
            });
          }
        }
      };
      
      $scope.$watch('report.name', function(newValue, oldValue) {
        if(!newValue || newValue.length === 0) {
          $scope.requirementMessages['report.name'] = "Report name is required.";
        }
        else {
          delete $scope.requirementMessages['report.name'];
        }
      });
      
      $scope.$watch('report.content', function(newValue, oldValue) {
        if(!newValue || newValue.length === 0) {
          $scope.requirementMessages['report.content'] = "Report content is required.";
        }
        else {
          delete $scope.requirementMessages['report.content'];
        }
      });
      
      $scope.requirementsMessagesEmpty = function() {
        return _.isEmpty($scope.requirementMessages);
      };
      
      $scope.init = function(report_id) {
        Report.get(report_id).success(function(report) {
              $scope.report = report;
              self.loadOrganizationsAndSnippets();
              self.loadReportTemplates();
          }); 
      };
      
      $scope.isFormInvalid = function() {
        return $scope.report == null || !$scope.report.name || !$scope.report.content;
      };
      
      $scope.save = function() {
        self.setSelectedOrganizations();
        Report.save($scope.report).success(function(result) {
            window.location.href = result.redirectUrl;
          });
      };
      
      self.loadOrganizationsAndSnippets = function() {
        Report.organizations().success(function(organizations) {
          $scope.organizations = organizations;
          if ($scope.report._id) {
            _.each($scope.organizations, function(o) {
              o.associated = _.contains($scope.report.organizations, o._id);
            });
          }
          }).then(function() {
            Report.snippets().success(function(snippets) {
              $scope.snippets = snippets;
          });
        });
      };
      
      self.loadReportTemplates = function() {
          Report.reportTemplates().success(function(reportTemplates) {
            $scope.reportTemplates = reportTemplates;
          });
      };
      
      self.isOrganizationAssociatedWithTemplate = function(organization, template) {
        var found = _.find(template.organizations, function(organization_id) {
          return organization_id == organization._id;  
        });
        return found != null;
      };
      
      self.setSelectedOrganizations = function() {
        $scope.report.organizations = _.reject(_.map($scope.organizations, function(o) {
          if (o.associated) {
            return o._id;
          }
          return null;
        }), function(id) { return id == null; });
      };
    }
]);