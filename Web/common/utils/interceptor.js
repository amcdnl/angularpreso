define(['angular'], function(angular){

    var module = angular.module('security.interceptor', []);

    // This http interceptor listens for authentication failures
    module.factory('securityInterceptor', function($injector, $location) {
        return function(promise) {

            // Intercept failed requests
            return promise.then(null, function(originalResponse) {
                if(originalResponse.status === 401) {
                    $location.path('/login');
                }

                return promise;
            });
        };
    });

    // We have to add the interceptor to the queue as a string because the 
    // interceptor depends upon service instances that are not available in the config block.
    module.config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.responseInterceptors.push('securityInterceptor');
    });

    return module;

});