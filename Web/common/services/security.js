var module = angular.module('security.service', []);

module.factory('security', function ($http, $q, $location, $rootScope) {
    var service = {
            
        login: function(user) {
            var request = $http.post('api/account/login', user);
            return request.success(function(response){
                service.currentUser = response;
                return service.isAuthenticated();
            });
        },

        logout: function() {
            var request = $http.post('api/account/logout')
            return request.success(function(){
                service.currentUser = null;
                $location.path('login');
            });
        },

        authorize:function(){
            // authorizes the session by fetching
            // the profile from the current cookie
            var request = $http.get('api/account/profile');
            return request.success(function(response){
                service.currentUser = response;
            });
        },

        // Information about the current user
        currentUser: null,

        // Is the current user authenticated?
        isAuthenticated: function () {
            return !!service.currentUser;
        },

        // Is the current user an adminstrator?
        isAdmin: function () {
            return !!(service.currentUser && service.currentUser.admin);
        }
    };

    $rootScope.isAuthenticated = service.isAuthenticated;

    return service;
});