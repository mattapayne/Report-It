angular.module('angular-redactor', [])
  .directive("redactor", [function () {
    return {
      restrict: 'A',
      require: "ngModel",
      template: '<textarea cols="30" rows="10"></textarea>',
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
        }

        var updateModel = function () {
          return scope.safeApply(function () {
            ngModel.$setViewValue(elm.redactor('get'));
          });
        };

        var options = {
          changeCallback: updateModel
        };

        var additionalOptions = attrs.options ? scope.$eval(attrs.options) : {};
        angular.extend(options, additionalOptions);

        var redactor = elm.redactor(options);
        ngModel.$render = function () {
          return redactor != null ? elm.redactor('set', ngModel.$viewValue || '') : void 0;
        };
      }
    };
  }]);

angular.module('ReportIt.validation', []).directive('mustBeInteger', function() {
  var INTEGER_REGEXP = /^\-?\d*$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (INTEGER_REGEXP.test(viewValue)) {
          ctrl.$setValidity('mustBeInteger', true);
          return viewValue;
        }
        else {
          ctrl.$setValidity('mustBeInteger', false);
          return undefined;
        }
      });
    }
  }
});