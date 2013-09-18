//bootstrap Angular
angular.module('ReportIt.dashboard.services', []);
angular.module('ReportIt.dashboard.controllers', []);
angular.module('ReportIt.dashboard',
               ['ReportIt.dashboard.services',
                'ReportIt.dashboard.controllers',
                'ReportIt.validation',
                'ngSanitize',
                'globalErrors',
                'angular-redactor']);