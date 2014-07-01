var module = angular.module('services.signalr', []);

    module.service('SignalR', function($rootScope) {
        var proxy = null,
            cb;

        var initialize = function () {
            //Getting the connection object
            connection = $.hubConnection($('head>base').attr('href'));
            connection.logging = true;

            //Creating proxy
            this.proxy = connection.createHubProxy('notifications');

            //Publishing an event when server pushes a greeting message
            this.proxy.on('broadcastMessage', function (ev, obj) {
                $rootScope.$emit(ev, obj);
            });
 
            //Starting connection
            return cb = connection.start({ transport: ['webSockets','longPolling'] });
        };
 
        var sendRequest = function (ev, obj) {
            var self = this;
            cb.done(function(){
                self.proxy.invoke('send', ev, obj);
            });
        };
 
        return {
            initialize: initialize,
            sendRequest: sendRequest
        }; 
    });