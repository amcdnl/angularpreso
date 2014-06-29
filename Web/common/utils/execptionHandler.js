var module = angular.module('services.exceptionHandler', []);

module.factory('exceptionHandlerFactory', function ($injector) {
    return function ($delegate, $alert, $location) {
        return function (exception, cause) {
            // Pass through to original handler
            $delegate(exception, cause);
            alert('Error ocurred');                
        };
    };
});

module.config(function ($provide) {
    $provide.decorator('$exceptionHandler', function ($delegate, exceptionHandlerFactory) {
        return exceptionHandlerFactory($delegate);
    });
});