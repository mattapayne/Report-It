//bootstrap Angular
angular.module('inspectory.ly.dashboard.services', []);
angular.module('inspectory.ly.dashboard.controllers', []);
angular.module('inspectory.ly.dashboard',
               ['inspectory.ly.dashboard.services',
                'inspectory.ly.dashboard.controllers',
                'ngSanitize']);