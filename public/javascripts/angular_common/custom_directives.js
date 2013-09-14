//TODO - Update this when updating the version of Redactor
angular.module('angular-redactor', [])
  .directive("redactor", [function () {
    return {
      restrict: 'A',
      require: "ngModel",
      link: function (scope, elm, attrs, ngModel) {
        scope.safeApply = function (fn) {
          var phase = this.$root.$$phase;
          if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };

        var updateModel = function () {
          return scope.safeApply(function () {
            ngModel.$setViewValue(elm.redactor().getCode());
          });
        };

        var options = {
          keyupCallback: updateModel
        };

        var additionalOptions = attrs.options ? scope.$eval(attrs.options) : {};
        angular.extend(options, additionalOptions);

        var redactor = elm.redactor(options);
        
        ngModel.$render = function () {
          return redactor != null ? redactor.setCode(ngModel.$viewValue || '') : void 0;
        };
      }
    };
  }]);