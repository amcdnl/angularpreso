var app = angular.module('angularnet', ['ngCookies', 'ui.router', 
    'ngAnimate', 'ngSanitize', 'security.service', 
    'services.exceptionHandler', 'security.interceptor', 'login', 'dashboard']);

app.config(function ($urlRouterProvider, $locationProvider, $httpProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/404');

    // placeholder for 404
    $stateProvider.state('404', {
        url: '/'
    });

    $locationProvider.html5Mode(true);
});
            
app.run(function ($rootScope, $location, $state, $stateParams, security, $urlRouter) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ui-sref-active="active }"> will set the <li> // to active whenever
    // 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // de-register the start event after login to prevent further calls
    var deregister = $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        // stop current event
        event.preventDefault();

        security.authorize().success(function(){
            if($location.$$url === "/" || $location.$$url === "/login"){
                // if we have no url or was on login page, 
                // navigate me to dashboard page
                $location.path('dashboard');
            } else {
                // continue on event if we have a url
                $urlRouter.sync();
            }
        }).error(function(){
            // redirect to login, prob redudant
            $location.path('login');

            // continue on event
            $urlRouter.sync();
        });

        // unregister event
        deregister();
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        if ($state.current){
            // SET CSS and Page Titles
            $rootScope.controller = $state.current.cssClass || $state.current.controller;
            $rootScope.page_title = $state.current.title;
        }
    });

});