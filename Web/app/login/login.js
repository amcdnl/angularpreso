var module = angular.module('login', ['security.service'])

module.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/login/login.tpl.html',
        title: 'Login',
        controller: 'LoginCtrl'
    });
});

module.controller('LoginCtrl', function ($rootScope, $scope, $location, security) {

    $scope.login = function () {
        security.login({
            username: $scope.username,
            password: $scope.password
        }).then(function (res) {
            $location.path('/dashboard');
        }, function(){
            alert('Login failed!');  
        });
    };

});