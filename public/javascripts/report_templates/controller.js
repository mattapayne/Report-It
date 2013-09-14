angular.module('ReportIt.report_template.controllers').
    controller('ReportTemplateController', ['$scope', 'ReportTemplate', function($scope, ReportTemplate) {
      
      var self = this;
      $scope.requirementMessages = {};
      $scope.organizations = [];
      $scope.snippets = [];
      $scope.reportTemplate = null;
      
      $scope.redactorOptions = {
        imageUpload : '/images/upload/',
        clipboardUploadUrl: '/images/upload/',
        focus: true,
        minHeight: 550,
        linebreaks: true,
        paragraphy: false,
        plugins: ['clips', 'fontsize', 'fontfamily', 'fontcolor', 'fullscreen']
      };
      
      $scope.$watch('reportTemplate.name', function(newValue, oldValue) {
        if(!newValue || newValue.length === 0) {
          $scope.requirementMessages['reportTemplate.name'] = "Template name is required.";
        }
        else {
          delete $scope.requirementMessages['reportTemplate.name'];
        }
      });
      
      $scope.$watch('reportTemplate.content', function(newValue, oldValue) {
        if(!newValue || newValue.length === 0) {
          $scope.requirementMessages['reportTemplate.content'] = "Template content is required.";
        }
        else {
          delete $scope.requirementMessages['reportTemplate.content'];
        }
      });
      
      $scope.requirementsMessagesEmpty = function() {
        return _.isEmpty($scope.requirementMessages);
      };
      
      self.loadOrganizationsAndSnippets = function() {
        ReportTemplate.organizations().success(function(organizations) {
          $scope.organizations = organizations;
          if ($scope.reportTemplate._id) {
            _.each($scope.organizations, function(o) {
              o.associated = _.contains($scope.reportTemplate.organizations, o._id);
            });
          }
        }).then(function() {
          ReportTemplate.snippets().success(function(snippets) {
            $scope.snippets = snippets;
        });
      });
      };
      
      self.setSelectedOrganizations = function() {
        $scope.reportTemplate.organizations = _.reject(_.map($scope.organizations, function(o) {
          if (o.associated) {
            return o._id;
          }
          return null;
        }), function(id) { return id == null; });
      };
      
      $scope.init = function(report_template_id) {
        ReportTemplate.get(report_template_id).success(function(reportTemplate) {
              $scope.reportTemplate = reportTemplate;
              self.loadOrganizationsAndSnippets();
          }); 
      };
      
      $scope.isFormInvalid = function() {
        return $scope.reportTemplate == null || !$scope.reportTemplate.name || !$scope.reportTemplate.content;
      };
      
      $scope.save = function() {
        self.setSelectedOrganizations();
        ReportTemplate.save($scope.reportTemplate).success(function(result) {
            window.location.href = result.redirectUrl;
          });
      };
    }
]);