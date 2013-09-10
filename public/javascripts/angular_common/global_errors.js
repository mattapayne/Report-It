angular
    .module('globalErrors', [])
    .config(function($provide, $httpProvider, $compileProvider) {
        var elementsList = $();

        var showMessage = function(content, cl, time, html) {
            html = html ? html : false;
            var errorHtml = $('<div/>')
                .addClass('alert')
                .addClass(cl)
                .hide()
                .fadeIn('fast')
                .delay(time)
                .fadeOut('fast', function() { $(this).remove(); })
                .appendTo(elementsList);
            
            if (html) {
                errorHtml.html(content);
            }
            else {
                errorHtml.text(content);
            }
        };
        
        var extractMessage = function(data) {
            var msg = $("<strong>").text(data.message);
            if (data.errors && data.errors.length > 0) {
                var ol = $("<ol>")
                _.each(data.errors, function(error) {
                   ol.append($("<li>").text(error.name + " is " + error.type)); 
                });
                msg.append(ol);
            }
            return msg;
        };
        
        $httpProvider.responseInterceptors.push(function($timeout, $q) {
            return function(promise) {
                return promise.then(function(successResponse) {
                    if (successResponse.config.method.toUpperCase() != 'GET')
                        showMessage('Success', 'alert-success', 5000);
                    return successResponse;

                }, function(errorResponse) {
                    switch (errorResponse.status) {
                        case 401:
                            showMessage('Wrong usename or password', 'alert-danger', 20000, false);
                            break;
                        case 403:
                            showMessage('You don\'t have the right to do this', 'alert-danger', 20000, false);
                            break;
                        case 406:
                            showMessage(extractMessage(errorResponse.data), 'alert-danger', 2000, true);
                            break;
                        case 500:
                            showMessage('Server internal error: ' + errorResponse.data, 'alert-danger', 20000, false);
                            break;
                        default:
                            showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data, 'alert-danger', 20000, false);
                    }
                    return $q.reject(errorResponse);
                });
            };
        });

        $compileProvider.directive('appMessages', function() {
            var directiveDefinitionObject = {
                link: function(scope, element, attrs) { elementsList.push($(element)); }
            };
            return directiveDefinitionObject;
        });
    });