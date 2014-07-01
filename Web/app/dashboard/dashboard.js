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
    var service, hub;
    
    hub = new Hub('notifications', {
    
        // listen for server events
        broadcastMessage: function(ev, obj){
            service.users.push(obj);
            $rootScope.$apply();
        }
        
    }, ['send']);

    service = {

        join: function(currentUser) {
            hub.send('userJoined', {
                userName: currentUser.userName
            });
        },

        hub: hub,

        users: []
    };

    return service;
});

module.controller('DashboardCtrl', function ($rootScope, $scope, $location, security, DashboardModel) {
    $scope.profile = security.currentUser;
    $scope.users = DashboardModel.users;

    DashboardModel.hub.promise.then(function(){
        DashboardModel.join($scope.profile);
    });

    $scope.logout = function(){
        security.logout().then(function(){
            $location.path('/login');
        });
    };

});