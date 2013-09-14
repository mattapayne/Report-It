//bootstrap Angular
angular.module('ReportIt.report.services', []);
angular.module('ReportIt.report.controllers', []);
angular.module('ReportIt.report',
               ['ReportIt.report.services',
                'ReportIt.report.controllers',
                'ngSanitize', 'globalErrors', 'angular-redactor']);