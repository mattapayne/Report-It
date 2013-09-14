//bootstrap Angular
angular.module('ReportIt.report_template.services', []);
angular.module('ReportIt.report_template.controllers', []);
angular.module('ReportIt.report_template',
               ['ReportIt.report_template.services',
                'ReportIt.report_template.controllers',
                'ngSanitize', 'globalErrors', 'angular-redactor']);