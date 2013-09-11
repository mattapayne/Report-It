//bootstrap Angular
angular.module('InspectIt.dashboard.services', []);
angular.module('InspectIt.dashboard.controllers', []);
angular.module('InspectIt.dashboard',
               ['InspectIt.dashboard.services',
                'InspectIt.dashboard.controllers',
                'ngSanitize', 'globalErrors']);