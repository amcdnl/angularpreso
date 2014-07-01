var module = angular.module('services.signalr', []);

module.factory('Hub', function () {

    // create one connection for all hubs
    var globalConnection = $.hubConnection($('head>base').attr('href'));

	return function (hubName, listeners, methods) {

		var Hub = this;
		Hub.connection = globalConnection;
		Hub.proxy = Hub.connection.createHubProxy(hubName);
		
		Hub.on = function (event, fn) {
			Hub.proxy.on(event, fn);
		};

		Hub.invoke = function (method, args) {
			Hub.proxy.invoke.apply(Hub.proxy, arguments)
		};

		if (listeners) {
			angular.forEach(listeners, function (fn, event) {
				Hub.on(event, fn);
			});
		}

		if (methods) {
			angular.forEach(methods, function (method) {
				Hub[method] = function () {
					var args = $.makeArray(arguments);
					args.unshift(method);
					Hub.invoke.apply(Hub, args);
				};
			});
		}

        Hub.promise = Hub.connection.start();

		return Hub;
	};
});