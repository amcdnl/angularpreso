var app = angular.module('angularnet', ['ngCookies', 'ui.router', 
    'ngAnimate', 'ngSanitize', 'security.service', 'services.exceptionHandler',
    'login', 'dashboard']);

app.config(function ($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/dashboard');
    $locationProvider.html5Mode(true);
});
            
app.run(function ($rootScope, $location, $state, $stateParams, security) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ui-sref-active="active }"> will set the <li> // to active whenever
    // 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // de-register the start event after login to prevent further calls
    var deregister = $rootScope.$on("$stateChangeStart", function () {
        security.authorize().success(function(){
            // unregister event
            deregister();
        }).error(function(){
            $location.path('login');
        });
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        if ($state.current){
            // SET CSS and Page Titles
            $rootScope.controller = $state.current.cssClass || $state.current.controller;
            $rootScope.page_title = $state.current.title;
        }
    });

});