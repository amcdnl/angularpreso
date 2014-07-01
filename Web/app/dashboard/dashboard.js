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

module.controller('DashboardCtrl', function ($rootScope, $scope, $location, security, SignalR) {
    $scope.profile = security.currentUser;
    $scope.users = [];

    SignalR.initialize().done(function(){
        SignalR.sendRequest();

        var newObj = {};
        newObj[currentUser.id] = currentUser.userName;
        SignalR.sendRequest("joined", newObj);
    });

    $rootScope.$on("joined", function(ev, obj){
        $scope.users.push(obj)
    });

    $scope.logout = function(){
        security.logout().then(function(){
            $location.path('/login');
        });
    };

});