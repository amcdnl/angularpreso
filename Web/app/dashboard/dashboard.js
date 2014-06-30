var module = angular.module('dashboard', ['security.service', 'services.signalr'])

module.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.tpl.html',
        title: 'Dashboard Page',
        controller: 'DashboardCtrl',
        /*
        // You can use resolves to pre-load models
        // such as 'Dashboards' in this case before the 
        // controller has loaded.  It will inject the name 
        // you use below in to the constructor of the controller
        resolve: {
            dashboards: function (DashboardsModel) {
                return DashboardsModel.findAll();
            }
        }
        */
    });
});

module.factory('DashboardModel', function ($http, $q, $location, $rootScope, Hub) {
    var hub = new Hub('notifications', {}, ['send']);

    var service = {
        join: function() {
            hub.send('userJoined', {
                "12312": "Austin"
            });
        }
    };

    return service;
});

module.controller('DashboardCtrl', function ($rootScope, $scope, $location, security, DashboardModel) {
    DashboardModel.join();

    $scope.profile = security.currentUser;

    $scope.logout = function(){
        security.logout().then(function(){
            $location.path('/login');
        });
    };

});