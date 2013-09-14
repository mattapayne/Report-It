angular.module('ReportIt.report_template.controllers').
    controller('ReportTemplateController', ['$scope', 'ReportTemplate', function($scope, ReportTemplate) {
      
      var self = this;
      $scope.organizations = [];
      $scope.snippets = [];
      $scope.reportTemplate = null;
      
      $scope.redactorOptions = {
        imageUpload : '/images/upload/',
        clipboardUploadUrl: '/images/upload/',
        focus: true,
        minHeight: 500,
        linebreaks: true,
        paragraphy: false,
        plugins: ['clips', 'fontsize']
      };
        
      self.loadOrganizationsAndSnippets = function() {
        ReportTemplate.organizations().success(function(organizations) {
          $scope.organizations = organizations;
          _.each($scope.organizations, function(o) {
            o.associated = _.contains($scope.reportTemplate.organizations, o._id);
          });
        }).then(function() {
          ReportTemplate.snippets().success(function(snippets) {
          _.each(snippets, function(s) {
              snippets.visible = false;
          });
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
        //this is a new report template
        if (!report_template_id) {
          $scope.reportTemplate = {name: '', description: '', content: '', organizations: []};
          self.loadOrganizationsAndSnippets();
        }
        else {
            ReportTemplate.get(report_template_id).success(function(reportTemplate) {
              $scope.reportTemplate = reportTemplate;
              self.loadOrganizationsAndSnippets();
          }); 
        }
      };
      
      $scope.isFormInvalid = function() {
        return $scope.reportTemplate == null || !$scope.reportTemplate.name || !$scope.reportTemplate.content;
      };
      
      $scope.save = function() {
        self.setSelectedOrganizations();
        //this is an update to an existing report template
        if ($scope.reportTemplate._id) {
          ReportTemplate.update($scope.reportTemplate).success(function() {
            window.location.href = '/dashboard';
          });
        }
        else {
          ReportTemplate.save($scope.reportTemplate).success(function() {
            window.location.href = '/dashboard';
          });
        }
      };
      
      $scope.addOrganization = function() {
        //TODO - Implement
      };
      
      $scope.addSnippet = function() {
        //TODO - Implement
      };
      
      $scope.editSnippet = function(index) {
        //TODO - Implement
      };
      
      $scope.deleteSnippet = function(index) {
        //TODO - Implement
      };
      
      $scope.isSnippetVisible = function(index) {
        var snippet = $scope.snippets[index];
        return snippet && snippet.visible == true;
      };
      
      $scope.toggleSnippetVisible = function(index) {
        var snippet = $scope.snippets[index];
        if(snippet) {
          snippet.visible = !snippet.visible;
        }
      };
    }
]);