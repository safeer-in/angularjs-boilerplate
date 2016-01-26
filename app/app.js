define([],function (){

	var app = angular.module('app',['ngRoute','routeResolverServices','menu.directives']);

	app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$httpProvider',

        function ($routeProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide, $httpProvider) {



            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                //route.resolve() now accepts the convention to use (name of controller & view) as well as the 
                //module where module folder is placed and 
                //path where the controller or view lives in the controllers or views folder if it's in a sub folder. 
                //Thanks to Ton Yeung for the idea and contribution
                //eg: route.resolve(baseName, module, path, controllerAs, secure)
                .when('/home',route.resolve('Home','home','','mep')) 
                .when('/about',route.resolve('About','home','','mep')) 
                .when('/contact',route.resolve('Contact','home','','mep')) 
                .otherwise({ redirectTo: '/home' });
				

    }]);

	return app;
});